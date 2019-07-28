"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("../config");
const node_fetch_1 = require("node-fetch");
class RankingCommand {
    constructor() {
        this._keyword = "rank";
    }
    help() {
        return "Updates #ranking table";
    }
    runCommand(args, message, bot) {
        if (message !== null && !message.member.roles.has(ConfigFile.roles.ADMIN))
            return;
        let teamsChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.TEAMS);
        let rankingChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.RANKING);
        let botTestingChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.BOT_TESTING);
        teamsChannel.fetchMessages().then(messages => {
            this.getRanks(messages).then(ranks => {
                console.log(ranks);
                let embed = new Discord.RichEmbed().setTitle('3v3 Standard MMR Ranking');
                let description = "";
                ranks.sort((a, b) => {
                    return b.teamMMR - a.teamMMR;
                });
                ranks.forEach(team => {
                    if (team.teamMMR === 0) {
                        description += `${team.teamName}  ---\n`;
                    }
                    else {
                        description += `${team.teamName} **${team.teamMMR}**\n`;
                    }
                });
                embed.setDescription(description);
                embed.setTimestamp();
                embed.setFooter('Last update', ConfigFile.config.logo);
                rankingChannel.bulkDelete(2);
                rankingChannel.send(embed);
            });
        }).catch(exception => {
            console.log(exception);
        });
    }
    getRanks(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            let ranks = [];
            for (const message of messages.values()) {
                yield this.getTeamMMR(message).then(teamMMR => {
                    ranks.push(teamMMR);
                });
            }
            return ranks;
        });
    }
    getTeamMMR(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let lines = message.content.split('\n');
            let teamName = lines[0];
            let players = lines.slice(2);
            let playerCount = players.length;
            let teamMMR = 0;
            let baseURL = "https://rocketleague.tracker.network/profile/";
            for (const player of players) {
                let platform = player.split(/(\s+)/).filter(e => e.trim().length > 0)[2];
                let id = player.split(/(\s+)/).filter(e => e.trim().length > 0)[3];
                if (platform.toLowerCase() === "pc")
                    platform = "steam";
                let url = baseURL + platform + '/' + id;
                yield this.getPlayerMMR(url).then(playerMMR => {
                    if (playerMMR === 0)
                        playerCount--;
                    else
                        teamMMR += playerMMR;
                }).catch(exeption => {
                    console.log(exeption);
                });
            }
            if (playerCount !== 0)
                teamMMR = Math.trunc(teamMMR / playerCount);
            console.log(teamName + " : " + teamMMR);
            return { teamName, teamMMR };
        });
    }
    getPlayerMMR(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let mmr = 0;
            yield node_fetch_1.default(url).then(response => {
                return response.text();
            }).then(html => {
                let title = html.split('<title>')[1].split('</title>')[0];
                title = title.trim();
                if (title.length === 0) {
                    console.log('player not found: ' + url);
                    return null;
                }
                else {
                    let playerData = html.split('<script type="text/javascript">')[3].split('</script>')[0];
                    let player3v3StandardRanks = playerData.split("'Ranked Standard 3v3', data: [")[1].split('] },')[0].split(',');
                    let playerMMR = parseInt(player3v3StandardRanks[player3v3StandardRanks.length - 1]);
                    console.log(title + " " + playerMMR);
                    if (playerMMR !== undefined)
                        mmr = playerMMR;
                    return playerMMR;
                }
            }).catch(exception => {
                console.log('Failed to fetch page: ', exception);
            });
            return mmr;
        });
    }
}
exports.default = RankingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yYW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsd0NBQXdDO0FBRXhDLDJDQUErQjtBQUUvQixNQUFxQixjQUFjO0lBQW5DO1FBQ2EsYUFBUSxHQUFXLE1BQU0sQ0FBQztJQTBIdkMsQ0FBQztJQXhIRyxJQUFJO1FBQ0EsT0FBTyx3QkFBd0IsQ0FBQztJQUNwQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxPQUErQixFQUFFLEdBQW1CO1FBQzNFLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUFFLE9BQU87UUFFbEYsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUF3QixDQUFDO1FBQ2pILElBQUksY0FBYyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBd0IsQ0FBQztRQUNySCxJQUFJLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBd0IsQ0FBQztRQUU1SCxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMs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
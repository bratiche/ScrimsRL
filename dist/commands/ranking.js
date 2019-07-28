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
const trnscraper_1 = require("../trnscraper");
class RankingCommand {
    constructor() {
        this._keyword = "ranking";
        this._enabled = true;
        this.mmrFetchMethod = new trnscraper_1.default();
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
        if (message != null)
            message.channel.startTyping();
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
                if (message != null) {
                    if (message.channel.id === ConfigFile.channels.RANKING) {
                        message.channel.bulkDelete(2);
                    }
                    message.channel.send(embed);
                    message.channel.stopTyping();
                }
                else {
                    rankingChannel.bulkDelete(2);
                    rankingChannel.send(embed);
                }
            });
        }).catch(exception => {
            console.log(exception);
            if (message != null)
                message.channel.stopTyping(true);
        });
    }
    getRanks(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            let ranks = [];
            for (const message of messages.values()) {
                yield this.getTeamInfo(message).then(teamInfo => {
                    ranks.push(teamInfo);
                });
            }
            return ranks;
        });
    }
    getTeamInfo(message) {
        return __awaiter(this, void 0, void 0, function* () {
            let lines = message.content.split('\n');
            let teamName = lines[0];
            let players = lines.slice(2);
            let playerCount = players.length;
            let teamMMR = 0;
            for (const player of players) {
                let platform = player.split(/(\s+)/).filter(e => e.trim().length > 0)[2];
                let id = player.split(/(\s+)/).filter(e => e.trim().length > 0)[3];
                if (platform.toLowerCase() === "pc")
                    platform = "steam";
                yield this.mmrFetchMethod.getPlayerMMR(platform, id).then(playerMMR => {
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
}
exports.default = RankingCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFua2luZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9yYW5raW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsd0NBQXdDO0FBRXhDLDhDQUF3QztBQUd4QyxNQUFxQixjQUFjO0lBQW5DO1FBQ2EsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUN0QyxhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLG1CQUFjLEdBQW9CLElBQUksb0JBQVcsRUFBRSxDQUFDO0lBK0Z4RCxDQUFDO0lBN0ZHLElBQUk7UUFDQSxPQUFPLHdCQUF3QixDQUFDO0lBQ3BDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQStCLEVBQUUsR0FBbUI7UUFDM0UsSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTztRQUVsRixJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQXdCLENBQUM7UUFDakgsSUFBSSxjQUFjLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUF3QixDQUFDO1FBQ3JILElBQUksaUJBQWlCLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUF3QixDQUFDO1FBRTVILElBQUksT0FBTyxJQUFJLElBQUk7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
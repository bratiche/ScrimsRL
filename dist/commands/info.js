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
const trnscraper_1 = require("../trnscraper");
const Database = require("../database");
class InfoCommand {
    constructor() {
        this._keyword = "info";
        this._enabled = true;
        this.mmrFetchMethod = new trnscraper_1.default();
    }
    help() {
        return "Shows info on a certain team";
    }
    runCommand(args, message, bot) {
        if (args.length != 1) {
            message.channel.send('Especifica equipo: !info [team]');
            return;
        }
        message.channel.startTyping();
        Database.getPlayersFromTeam(args[0], (players, err) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                switch (err) {
                    case Database.error.ERROR_TEAM_NOT_ON_DATABASE:
                        message.channel.send('Ese equipo no está registrado.');
                        break;
                    case Database.error.ERROR_DUPLICATE_TEAMS:
                        message.channel.send('Hay dos equipos con el mismo tag. Contacta a un Administrador para solucionar el problema.');
                        break;
                }
                message.channel.stopTyping();
                return;
            }
            let embed = new Discord.RichEmbed().setTitle(`[${players[0].team.tag}] ${players[0].team.name}`);
            let playersField = "";
            let playerCount = players.length;
            let teamMMR = 0;
            for (let i = 0; i < players.length; i++) {
                const player = players[i];
                yield this.mmrFetchMethod.getPlayerMMR(player.platform, player.id).then(playerMMR => {
                    let name = player.discordUserID === 'undefined' ? player.name : `<@${player.discordUserID}>`;
                    playersField += `${name} ${this.getRankEmoji(playerMMR)}\n`;
                    if (playerMMR === 0)
                        playerCount--;
                    else
                        teamMMR += playerMMR;
                });
            }
            if (playerCount !== 0)
                teamMMR = Math.trunc(teamMMR / playerCount);
            embed.addField('Players', playersField);
            embed.addField('Average MMR', teamMMR === 0 ? "---" : teamMMR);
            message.channel.send(embed);
            message.channel.stopTyping();
        }));
    }
    getRankEmoji(mmr) {
        let icon = '<:ur:594036558433222666>';
        if (mmr >= 934 && mmr < 1014) {
            icon = '<:d1:594019064381308965>';
        }
        else if (mmr >= 1014 && mmr < 1095) {
            icon = '<:d2:594019038217240587>';
        }
        else if (mmr >= 1095 && mmr < 1195) {
            icon = '<:d3:594019016805318697>';
        }
        else if (mmr >= 1195 && mmr < 1295) {
            icon = '<:c1:594019210267459584>';
        }
        else if (mmr >= 1295 && mmr < 1395) {
            icon = '<:c2:594019120605954070>';
        }
        else if (mmr >= 1395 && mmr < 1515) {
            icon = '<:c3:594019093779054602>';
        }
        else if (mmr >= 1515) {
            icon = '<:gc:594019296070467584>';
        }
        return icon;
    }
}
exports.default = InfoCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFHdEMsOENBQXdDO0FBQ3hDLHdDQUF3QztBQUV4QyxNQUFxQixXQUFXO0lBQWhDO1FBQ2EsYUFBUSxHQUFXLE1BQU0sQ0FBQztRQUNuQyxhQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLG1CQUFjLEdBQW9CLElBQUksb0JBQVcsRUFBRSxDQUFDO0lBNkV4RCxDQUFDO0lBM0VHLElBQUk7UUFDQSxPQUFPLDhCQUE4QixDQUFDO0lBQzFDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQXdCLEVBQUUsR0FBbUI7UUFDcEUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ3hELE9BQU87U0FDVjtRQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFOUIsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFPLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUN4RCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxRQUFRLEdBQUcsRUFBRTtvQkFDVCxLQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsMEJBQTBCO3dCQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO3dCQUN2RCxNQUFNO29CQUNWLEtBQUssUUFBUSxDQUFDLEtBQUssQ0FBQyxxQkFBcUI7d0JBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDRGQUE0RixDQUFDLENBQUM7d0JBQ25ILE1BQU07aUJBQ2I7Z0JBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztn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
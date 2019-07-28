"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("../config");
const Database = require("../database");
exports.scrimMap = new Map();
function getMapSize() {
    let size = 0;
    exports.scrimMap.forEach((value, key) => {
        if (value.lfs)
            size++;
    });
    return size;
}
exports.getMapSize = getMapSize;
function mapKey(team) {
    return `[${team.tag}] ${team.name}`;
}
exports.mapKey = mapKey;
class ScrimCommand {
    constructor() {
        this._keyword = "scrim";
        this._enabled = true;
    }
    help() {
        return "Sends a broadcast message to all @Captain to the find-a-scrim channel.";
    }
    runCommand(args, message, bot) {
        if (message.channel.id !== ConfigFile.channels.FIND_A_SCRIM &&
            message.channel.id !== ConfigFile.channels.BOT_TESTING) {
            return;
        }
        if (!message.member.roles.find(role => role.id === ConfigFile.roles.CAPTAIN)) {
            message.reply("Debes ser capitán de equipo para usar éste comando!");
            return;
        }
        Database.getTeamOf(message.member.id, (team, err) => {
            if (team === null) {
                switch (err) {
                    case Database.error.ERROR_PLAYER_NOT_ON_DATABASE:
                        break;
                    case Database.error.ERROR_DUPLICATE_PLAYERS:
                        break;
                    case Database.error.ERROR_TEAM_NOT_ON_DATABASE:
                        break;
                    case Database.error.ERROR_DUPLICATE_TEAMS:
                        break;
                    default:
                        break;
                }
                return;
            }
            let teamKey = mapKey(team);
            let embed;
            if (exports.scrimMap.has(teamKey) && exports.scrimMap.get(teamKey).lfs) {
                message.reply("Tu equipo ya está buscando scrim.");
                console.log("error: already on list");
                return;
            }
            if (exports.scrimMap.has(teamKey)) {
                exports.scrimMap.get(teamKey).timeout++;
                exports.scrimMap.get(teamKey).lfs = true;
            }
            else {
                exports.scrimMap.set(teamKey, { requests: [], timeout: 1, lfs: true });
            }
            console.log(exports.scrimMap);
            let teamsLFS = getMapSize();
            let teamS = teamsLFS === 1 ? "equipo" : "equipos";
            embed = new Discord.RichEmbed()
                .setTitle(`[${team.tag}] ${team.name} está buscando scrim`)
                .setDescription(`Hay ${teamsLFS} ${teamS} buscando scrim <@&${ConfigFile.roles.CAPTAIN}>\n`)
                .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
            message.channel.send(embed);
            setTimeout(() => {
                if (!exports.scrimMap.has(teamKey))
                    return;
                exports.scrimMap.get(teamKey).timeout--;
                console.log(exports.scrimMap);
                if (exports.scrimMap.get(teamKey).timeout > 0)
                    return;
                let lfs = exports.scrimMap.get(teamKey).lfs;
                exports.scrimMap.delete(teamKey);
                console.log("timeout: ");
                console.log(exports.scrimMap);
                if (!lfs)
                    return;
                let teamsLFS = getMapSize();
                let teamS = teamsLFS === 1 ? "equipo" : "equipos";
                let timeoutEmbed = new Discord.RichEmbed()
                    .setTitle(`[${team.tag}] ${team.name} ha dejado de buscar scrim (timeout)`)
                    .setDescription(`Hay ${teamsLFS} ${teamS} buscando scrim <@&${ConfigFile.roles.CAPTAIN}>\n`)
                    .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                message.channel.send(timeoutEmbed);
            }, ConfigFile.config.scrimTimeout * 1000);
        });
    }
}
exports.default = ScrimCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvc2NyaW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0M7QUFDdEMsd0NBQXdDO0FBRXhDLHdDQUF3QztBQVE3QixRQUFBLFFBQVEsR0FBMkIsSUFBSSxHQUFHLEVBQXFCLENBQUM7QUFFM0UsU0FBZ0IsVUFBVTtJQUN0QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFFYixnQkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUM1QixJQUFJLEtBQUssQ0FBQyxHQUFHO1lBQUUsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBUkQsZ0NBUUM7QUFFRCxTQUFnQixNQUFNLENBQUMsSUFBbUI7SUFDdEMsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3hDLENBQUM7QUFGRCx3QkFFQztBQUVELE1BQXFCLFlBQVk7SUFBakM7UUFDYSxhQUFRLEdBQVcsT0FBTyxDQUFDO1FBQ3BDLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFrRzdCLENBQUM7SUFoR0csSUFBSTtRQUNBLE9BQU8sd0VBQXdFLENBQUM7SUFDcEYsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFjLEVBQUUsT0FBd0IsRUFBRSxHQUFtQjtRQUNwRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWTtZQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUN4RCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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
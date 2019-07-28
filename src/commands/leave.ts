import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand } from "../api";
import ScrimCommand, { scrimMap, ScrimInfo, getMapSize, mapKey } from "./scrim";
import * as Database from "../database";

export default class LeaveCommand implements IBotCommand {
    readonly _keyword: string = "leave";
    _enabled: boolean = true;

    help(): string {
        return "Stops looking for scrims.";
    }

    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {
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
                        // unexpected error
                        break;
                }
                return;
            }

            let teamKey = mapKey(team);
            let embed;

            if (!scrimMap.has(teamKey) || !(scrimMap.get(teamKey) as ScrimInfo).lfs) {
                //error: not on list
                message.reply("Tu equipo no está buscando scrim.");
                console.log("error: not on list");
            } else {
                // set team lts to false and TODO ??send dm to requesters??
                let scrimInfo = scrimMap.get(teamKey) as ScrimInfo;
                scrimInfo.lfs = false;
                scrimInfo.requests = [];
                console.log(scrimMap);
    
                let teamsLFS = getMapSize();
                let teamS = teamsLFS === 1 ? "equipo" : "equipos";
    
                // send message in channel to @Captain
                embed = new Discord.RichEmbed()
                    .setTitle(`[${team.tag}] ${team.name} ha dejado de buscar scrim`)
                    .setDescription(`Hay ${teamsLFS} ${teamS} buscando scrim <@&${ConfigFile.roles.CAPTAIN}>\n`)
                    .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                message.channel.send(embed);
            }
        });
    }

}
import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand } from "../api";
import * as Database from "../database";

export type ScrimInfo = {
    requests: string[],
    timeout: number,
    lfs: boolean,
}

export let scrimMap: Map<string, ScrimInfo> = new Map<string, ScrimInfo>();

export function getMapSize(): number {
    let size = 0;

    scrimMap.forEach((value, key) => {
        if (value.lfs) size++;
    });

    return size;
}

export function mapKey(team: Database.Team): string {
    return `[${team.tag}] ${team.name}`;
}

export default class ScrimCommand implements IBotCommand {
    readonly _keyword: string = "scrim";
    _enabled: boolean = true;

    help(): string {
        return "Sends a broadcast message to all @Captain to the find-a-scrim channel.";
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

            if (scrimMap.has(teamKey) && (scrimMap.get(teamKey) as ScrimInfo).lfs) {
                //error: already on list
                message.reply("Tu equipo ya está buscando scrim.");
                console.log("error: already on list");
                return;
            }

            // add team to scrimMap
            if (scrimMap.has(teamKey)) {
                (scrimMap.get(teamKey) as ScrimInfo).timeout++;
                (scrimMap.get(teamKey) as ScrimInfo).lfs = true;
                //(scrimMap.get(teamName) as ScrimInfo).requesters = []; // no deberia ser necesario
            } else {
                scrimMap.set(teamKey, { requests: [], timeout: 1, lfs: true });
            }

            console.log(scrimMap);

            let teamsLFS = getMapSize();
            let teamS = teamsLFS === 1 ? "equipo" : "equipos";

            //send message in channel to @Captain
            //message.channel.send(`<@&${ConfigFile.roles.CAPTAIN}>`);
            embed = new Discord.RichEmbed()
                .setTitle(`[${team.tag}] ${team.name} está buscando scrim`)
                .setDescription(`Hay ${teamsLFS} ${teamS} buscando scrim <@&${ConfigFile.roles.CAPTAIN}>\n`)
                .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);

            message.channel.send(embed);

            //1 hour timeout
            setTimeout(() => {
                if (!scrimMap.has(teamKey)) return;

                (scrimMap.get(teamKey) as ScrimInfo).timeout--;
                console.log(scrimMap);

                if ((scrimMap.get(teamKey) as ScrimInfo).timeout > 0) return;

                let lfs = (scrimMap.get(teamKey) as ScrimInfo).lfs;
                scrimMap.delete(teamKey);

                console.log("timeout: ");
                console.log(scrimMap);

                // If the team stopped lfs before the timeout expired
                if (!lfs) return;

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
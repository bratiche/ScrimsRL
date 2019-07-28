import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand, IMMRFetchMethod } from "../api";
import TRNScrapper from "../trnscraper";
import * as Database from "../database";

export default class InfoCommand implements IBotCommand {
    readonly _keyword: string = "info";
    _enabled: boolean = true;

    mmrFetchMethod: IMMRFetchMethod = new TRNScrapper();

    help(): string {
        return "Shows info on a certain team";
    }

    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {
        if (args.length != 1) {
            message.channel.send('Especifica equipo: !info [team]');
            return;
        }

        message.channel.startTyping();

        Database.getPlayersFromTeam(args[0], async (players, err) => {
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

                await this.mmrFetchMethod.getPlayerMMR(player.platform, player.id).then(playerMMR => {
                    let name = player.discordUserID === 'undefined' ? player.name : `<@${player.discordUserID}>`;
                    playersField += `${name} ${this.getRankEmoji(playerMMR)}\n`;

                    if (playerMMR === 0) playerCount--;
                    else teamMMR += playerMMR;
                });
            }

            if (playerCount !== 0) teamMMR = Math.trunc(teamMMR / playerCount);

            embed.addField('Players', playersField);
            embed.addField('Average MMR', teamMMR === 0 ? "---" : teamMMR);

            message.channel.send(embed);
            message.channel.stopTyping();
        });
    }

    getRankEmoji(mmr: number): string {
        let icon = '<:ur:594036558433222666>';

        if (mmr >= 934 && mmr < 1014) {
            icon = '<:d1:594019064381308965>';
        } else if (mmr >= 1014 && mmr < 1095) {
            icon = '<:d2:594019038217240587>';
        } else if (mmr >= 1095 && mmr < 1195) {
            icon = '<:d3:594019016805318697>';
        } else if (mmr >= 1195 && mmr < 1295) {
            icon = '<:c1:594019210267459584>';
        } else if (mmr >= 1295 && mmr < 1395) {
            icon = '<:c2:594019120605954070>';
        } else if (mmr >= 1395 && mmr < 1515) {
            icon = '<:c3:594019093779054602>';
        } else if (mmr >= 1515) {
            icon = '<:gc:594019296070467584>';
        }

        return icon;
    }
}


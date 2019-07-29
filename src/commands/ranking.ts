import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand, IMMRFetchMethod } from "../api";
import TRNScrapper from "../trnscraper";
import * as Database from "../database";

// ** ADMIN COMMAND **
export default class RankingCommand implements IBotCommand {
    readonly _keyword: string = "ranking";
    _enabled: boolean = true;

    mmrFetchMethod: IMMRFetchMethod = new TRNScrapper();

    help(): string {
        return "Updates #ranking table";
    }

    runCommand(args: string[], message: Discord.Message | null, bot: Discord.Client): void {
        if (message !== null && !message.member.roles.has(ConfigFile.roles.ADMIN)) return;

        if (message != null) message.channel.startTyping();

        console.log('Updating ranks...');

        Database.getTeams(teams => {
            let ranks: { teamName: string, teamMMR: number }[] = [];
            teams.forEach(team => {
                Database.getPlayersFromTeam(team.tag, async (players, err) => {
                    if (err) {
                        if (message) message.channel.stopTyping();
                        return;
                    }

                    let teamMMR = 0;
                    let playerCount = players.length;

                    for (const player of players) {
                        await this.mmrFetchMethod.getPlayerMMR(player.platform, player.id, 5).then(playerMMR => {
                            if (playerMMR === 0) playerCount--;
                            else teamMMR += playerMMR;
                        }).catch(exeption => {
                            console.log(exeption);
                        });
                    }

                    // Calculate average team MMR
                    if (playerCount !== 0) teamMMR = Math.trunc(teamMMR / playerCount);

                    console.log(`[${team.tag}] ${team.name} : ${teamMMR}`);
                    ranks.push({ teamName: `[${team.tag}] ${team.name}`, teamMMR: teamMMR });

                    if (ranks.length === teams.length) this.showRanks(message, bot, ranks);
                });
            });
        });
    }

    showRanks(message: Discord.Message | null, bot: Discord.Client, ranks: { teamName: string, teamMMR: number }[]): void {
        let rankingChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.RANKING) as Discord.TextChannel;
        let embed = new Discord.RichEmbed().setTitle('3v3 Standard MMR Ranking');
        let description = "";
        
        console.log(ranks);
        
        // Sort ranks and send message            
        ranks.sort((a, b) => {
            return b.teamMMR - a.teamMMR;
        });

        ranks.forEach(team => {
            if (team.teamMMR === 0) {
                description += `${team.teamName}  ---\n`;
            } else {
                description += `${team.teamName} **${team.teamMMR}**\n`;
            }
        });

        embed.setDescription(description);
        embed.setTimestamp();
        embed.setFooter('Last update', ConfigFile.config.logo);

        // updated manually with command
        if (message != null) {
            if (message.channel.id === ConfigFile.channels.RANKING) {
                message.channel.bulkDelete(2);
            }
            message.channel.send(embed);
            message.channel.stopTyping();
        } else { // updated automatically with interval
            rankingChannel.bulkDelete(2);
            rankingChannel.send(embed);
        }
    }

}
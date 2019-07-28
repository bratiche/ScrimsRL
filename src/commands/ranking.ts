import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand, IMMRFetchMethod } from "../api";
import TRNScrapper from "../trnscraper";

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

        let teamsChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.TEAMS) as Discord.TextChannel;
        let rankingChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.RANKING) as Discord.TextChannel;
        let botTestingChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.BOT_TESTING) as Discord.TextChannel;

        if (message != null) message.channel.startTyping();

        teamsChannel.fetchMessages().then(messages => {
            this.getRanks(messages).then(ranks => {
                console.log(ranks);
                // Sort ranks and send message            
                let embed = new Discord.RichEmbed().setTitle('3v3 Standard MMR Ranking');
                let description = "";

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
            });
        }).catch(exception => {
            console.log(exception);
            if (message != null) message.channel.stopTyping(true);
        });
    }

    async getRanks(messages: Discord.Collection<string, Discord.Message>): Promise<{ teamName: string, teamMMR: number }[]> {
        let ranks: { teamName: string, teamMMR: number }[] = [];

        for (const message of messages.values()) {
            await this.getTeamInfo(message).then(teamInfo => {
                ranks.push(teamInfo);
            });
        }

        return ranks;
    }

    async getTeamInfo(message: Discord.Message): Promise<{ teamName: string, teamMMR: number }> {
        let lines = message.content.split('\n');
        let teamName = lines[0];
        let players = lines.slice(2);
        let playerCount = players.length;
        let teamMMR = 0;

        for (const player of players as string[]) {
            let platform = player.split(/(\s+)/).filter(e => e.trim().length > 0)[2];
            let id = player.split(/(\s+)/).filter(e => e.trim().length > 0)[3];

            if (platform.toLowerCase() === "pc") platform = "steam";

            await this.mmrFetchMethod.getPlayerMMR(platform, id, 5).then(playerMMR => {
                if (playerMMR === 0) playerCount--;
                else teamMMR += playerMMR;
            }).catch(exeption => {
                console.log(exeption);
            });
        }

        // Calculate average team MMR
        if (playerCount !== 0) teamMMR = Math.trunc(teamMMR / playerCount);

        console.log(teamName + " : " + teamMMR);
        return { teamName, teamMMR };
    }
}
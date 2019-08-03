import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import * as Database from "../database";
import { IBotCommand } from "../api";

export default class UpdateCommand implements IBotCommand {
    readonly _keyword: string = "update";
    _enabled: boolean = true;

    help(): string {
        return "Updates database using info from #teams";
    }

    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {
        if (!message.member.roles.has(ConfigFile.roles.ADMIN)) return;

        let teamsChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.TEAMS) as Discord.TextChannel;

        message.delete();
        console.log('Updating database...');

        Database.flush();

        teamsChannel.fetchMessages().then(messages => {
            messages.forEach(message => {
                let lines = message.content.split('\n');
                let teamTag = lines[0].split('] ').filter(e => e.trim().length > 0)[0];
                let teamName = lines[0].split('] ').filter(e => e.trim().length > 0)[1];
                let players = lines.slice(2);

                let team = { name: teamName, tag: teamTag.slice(1) };
                Database.addTeam(team);

                players.forEach(p => {
                    let captain = p.split(/(\s+)/).filter(e => e.trim().length > 0)[0];
                    let playerName = p.split(/(\s+)/).filter(e => e.trim().length > 0)[1];
                    let platform = p.split(/(\s+)/).filter(e => e.trim().length > 0)[2];
                    let id = p.split(/(\s+)/).filter(e => e.trim().length > 0)[3];
                    let discordUserID = p.split(/(\s+)/).filter(e => e.trim().length > 0)[4];

                    if (platform.toLowerCase() === 'pc') platform = 'steam';

                    else if (platform.toLowerCase() === 'ps4') platform = 'psn';

                    if (discordUserID) {
                        if (discordUserID.includes("!")) {
                            discordUserID = discordUserID.split("!")[1].split(">")[0];
                        } else {
                            discordUserID = discordUserID.split("@")[1].split(">")[0];
                        }
                    }

                    let player = {
                        name: playerName,
                        discordUserID: discordUserID,
                        captain: captain === '🇨',
                        platform: platform,
                        id: id,
                        team: team,
                    };

                    Database.addPlayer(player);
                });
            });

        });
    }
}
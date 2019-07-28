import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand } from "../api";

export default class ClearCommand implements IBotCommand {
    readonly _keyword: string = "clear";
    _enabled: boolean = true;

    help(): string {
        return "This command clears messages from the channel!";
    }

    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {
        if (message.channel.type === "dm") return;
        
        if (message.member.roles.find(role => role.id === ConfigFile.roles.ADMIN) ||
            message.member.roles.find(role => role.id === ConfigFile.roles.MODERATOR)) {
            message.channel.bulkDelete(100);
        }
    }
}
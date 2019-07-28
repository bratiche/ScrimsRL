import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand } from "../api";

export default class HelpCommand implements IBotCommand {
    readonly _keyword: string = "help";
    _enabled: boolean = true;

    help(): string {
        return "Shows this message";
    }

    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {
        // Channel specific help
        if (message.channel.id === ConfigFile.channels.BOT_TESTING ||
            message.channel.id === ConfigFile.channels.FIND_A_SCRIM) {
            message.channel.send({ embed: ConfigFile.infoHelpEmbed });
        }
    }
}
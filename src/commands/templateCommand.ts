import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class TemplateCommand implements IBotCommand {
    readonly _keyword: string = "templateCommand";
    _enabled: boolean = true;

    help(): string {
        return "This is a test command!";
    }

    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {
        message.channel.send("All good!");
    }
}
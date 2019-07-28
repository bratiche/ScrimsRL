import * as Discord from "discord.js";
import { IBotCommand } from "../api";

// ** ADMIN COMMAND **
export default class TeamCommand implements IBotCommand {
    readonly _keyword: string = "team";
    _enabled: boolean = true;

    help(): string {
        return "Manages teams";
    }

    /**
     * !team create [TAG] [name] [players...]
     * !team edit [TAG]
     * !team info <name>
     */
    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {

        if (args.length < 1) return;

        // Subcommand
        switch (args[0]) {
            case "create":
                this.createTeam(args[1], args[2], args.slice(3));
                break;
            case "edit":
                break;
            case "info":
                break;
            default:
                break;
        }

    }

    createTeam(tag: string, name: string, players: string[]): void {

    }
}
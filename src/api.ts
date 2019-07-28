import * as Discord from "discord.js";

export interface IBotCommand {
    readonly _keyword: string;
    _enabled: boolean;

    help(): string;
    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void;
}

export interface IMMRFetchMethod {
    getPlayerMMR(platform: string, id: string): Promise<number>;
}
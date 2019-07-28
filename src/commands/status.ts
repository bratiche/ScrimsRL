import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand } from "../api";
import {scrimMap, getMapSize} from "./scrim";

export default class StatusCommand implements IBotCommand {
    readonly _keyword: string = "status";
    _enabled: boolean = true;

    help(): string {
        return "This is a test command!";
    }

    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {
        if (message.channel.id !== ConfigFile.channels.FIND_A_SCRIM &&
            message.channel.id !== ConfigFile.channels.BOT_TESTING) {
            return;
        }

        let teamsLFS = getMapSize();
        let teamS = teamsLFS === 1 ? "equipo" : "equipos";
        let embed = new Discord.RichEmbed();
        
        // If there are no teams looking for scrims 
        if (teamsLFS === 0) {
            embed.setTitle("En este momento no hay ningún equipo buscando scrim.");
            embed.setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
            message.channel.send(embed);
            return;
        }

        let fieldName = `Hay ${teamsLFS} ${teamS} buscando scrim`;
        let fieldValue = '';

        scrimMap.forEach((value, key) => {
            fieldValue += `:small_orange_diamond: ${key}\n`;
        });

        fieldValue += `\nPuedes ver el rango de los equipos en <#${ConfigFile.channels.RANKING}>`;
        embed.addField(fieldName, fieldValue);
        embed.setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
        message.channel.send(embed);
    }
}
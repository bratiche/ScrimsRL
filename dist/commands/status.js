"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("../config");
const scrim_1 = require("./scrim");
class StatusCommand {
    constructor() {
        this._keyword = "status";
        this._enabled = true;
    }
    help() {
        return "This is a test command!";
    }
    runCommand(args, message, bot) {
        if (message.channel.id !== ConfigFile.channels.FIND_A_SCRIM &&
            message.channel.id !== ConfigFile.channels.BOT_TESTING) {
            return;
        }
        let teamsLFS = scrim_1.getMapSize();
        let teamS = teamsLFS === 1 ? "equipo" : "equipos";
        let embed = new Discord.RichEmbed();
        if (teamsLFS === 0) {
            embed.setTitle("En este momento no hay ningún equipo buscando scrim.");
            embed.setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
            message.channel.send(embed);
            return;
        }
        let fieldName = `Hay ${teamsLFS} ${teamS} buscando scrim`;
        let fieldValue = '';
        scrim_1.scrimMap.forEach((value, key) => {
            fieldValue += `:small_orange_diamond: ${key}\n`;
        });
        fieldValue += `\nPuedes ver el rango de los equipos en <#${ConfigFile.channels.RANKING}>`;
        embed.addField(fieldName, fieldValue);
        embed.setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
        message.channel.send(embed);
    }
}
exports.default = StatusCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3N0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzQztBQUN0Qyx3Q0FBd0M7QUFFeEMsbUNBQTZDO0FBRTdDLE1BQXFCLGFBQWE7SUFBbEM7UUFDYSxhQUFRLEdBQVcsUUFBUSxDQUFDO1FBQ3JDLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFvQzdCLENBQUM7SUFsQ0csSUFBSTtRQUNBLE9BQU8seUJBQXlCLENBQUM7SUFDckMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFjLEVBQUUsT0FBd0IsRUFBRSxHQUFtQjtRQUNwRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsWUFBWTtZQUN2RCxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUN4RCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBRyxrQkFBVSxFQUFFLENBQUM7UUFDNUIsSUFBSSxLQUFLLEdBQUcsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDbEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7UUFHcEMsSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxRQUFRLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUN2RSxLQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsT0FBTztTQUNWO1FBRUQsSUFBSSxTQUFTLEdBQUcsT0FBTyxRQUFRLElBQUksS0FBSyxpQkFBaUIsQ0FBQztRQUMxRCxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFcEIsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDNUIsVUFBVSxJQUFJLDBCQUEwQixHQUFHLElBQUksQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsSUFBSSw2Q0FBNkMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBQztRQUMxRixLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN0QyxLQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNKO0FBdENELGdDQXNDQyJ9
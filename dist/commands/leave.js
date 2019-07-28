"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("../config");
const scrim_1 = require("./scrim");
const Database = require("../database");
class LeaveCommand {
    constructor() {
        this._keyword = "leave";
        this._enabled = true;
    }
    help() {
        return "Stops looking for scrims.";
    }
    runCommand(args, message, bot) {
        if (message.channel.id !== ConfigFile.channels.FIND_A_SCRIM &&
            message.channel.id !== ConfigFile.channels.BOT_TESTING) {
            return;
        }
        if (!message.member.roles.find(role => role.id === ConfigFile.roles.CAPTAIN)) {
            message.reply("Debes ser capitán de equipo para usar éste comando!");
            return;
        }
        Database.getTeamOf(message.member.id, (team, err) => {
            if (team === null) {
                switch (err) {
                    case Database.error.ERROR_PLAYER_NOT_ON_DATABASE:
                        break;
                    case Database.error.ERROR_DUPLICATE_PLAYERS:
                        break;
                    case Database.error.ERROR_TEAM_NOT_ON_DATABASE:
                        break;
                    case Database.error.ERROR_DUPLICATE_TEAMS:
                        break;
                    default:
                        break;
                }
                return;
            }
            let teamKey = scrim_1.mapKey(team);
            let embed;
            if (!scrim_1.scrimMap.has(teamKey) || !scrim_1.scrimMap.get(teamKey).lfs) {
                message.reply("Tu equipo no está buscando scrim.");
                console.log("error: not on list");
            }
            else {
                let scrimInfo = scrim_1.scrimMap.get(teamKey);
                scrimInfo.lfs = false;
                scrimInfo.requests = [];
                console.log(scrim_1.scrimMap);
                let teamsLFS = scrim_1.getMapSize();
                let teamS = teamsLFS === 1 ? "equipo" : "equipos";
                embed = new Discord.RichEmbed()
                    .setTitle(`[${team.tag}] ${team.name} ha dejado de buscar scrim`)
                    .setDescription(`Hay ${teamsLFS} ${teamS} buscando scrim <@&${ConfigFile.roles.CAPTAIN}>\n`)
                    .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                message.channel.send(embed);
            }
        });
    }
}
exports.default = LeaveCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbGVhdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0M7QUFDdEMsd0NBQXdDO0FBRXhDLG1DQUFnRjtBQUNoRix3Q0FBd0M7QUFFeEMsTUFBcUIsWUFBWTtJQUFqQztRQUNhLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFDcEMsYUFBUSxHQUFZLElBQUksQ0FBQztJQThEN0IsQ0FBQztJQTVERyxJQUFJO1FBQ0EsT0FBTywyQkFBMkIsQ0FBQztJQUN2QyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxPQUF3QixFQUFFLEdBQW1CO1FBQ3BFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZO1lBQ3ZELE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3hELE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQ3JFLE9BQU87U0FDVjtRQUVELFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDaEQsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUNmLFFBQVEsR0FBRyxFQUFFO29CQUNULEtBQUssUUFBUSxDQUFDLEtBQUssQ0FBQyw0QkFBNEI7d0JBQzVDLE1BQU07b0JBQ1YsS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLHVCQUF1Qjt3QkFDdkMsTUFBTTtvQkFDVixLQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsMEJBQTBCO3dCQUMxQyxNQUFNO29CQUNWLEtBQUssUUFBUSxDQUFDLEtBQUssQ0FBQyxxQkFBcUI7d0JBQ3JDLE1BQU07b0JBQ1Y7d0JBRUksTUFBTTtpQkFDYjtnQkFDRCxPQUFPO2FBQ1Y7WUFFRCxJQUFJLE9BQU8sR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsSUFBSSxLQUFLLENBQUM7WUFFVixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQWUsQ0FBQyxHQUFHLEVBQUU7Z0JBRXJFLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2FBQ3JDO2lCQUFNO2dCQUVILElBQUksU0FBUyxHQUFHLGdCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBYyxDQUFDO2dCQUNuRCxTQUFTLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztnQkFDdEIsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO2dCQUV0QixJQUFJLFFBQVEsR0FBRyxrQkFBVSxFQUFFLENBQUM7Z0JBQzVCLElBQUksS0FBSyxHQUFHLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUdsRCxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO3FCQUMxQixRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLDRCQUE0QixDQUFDO3FCQUNoRSxjQUFjLENBQUMsT0FBTyxRQUFRLElBQUksS0FBSyxzQkFBc0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssQ0FBQztxQkFDM0YsU0FBUyxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQy9CO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBRUo7QUFoRUQsK0JBZ0VDIn0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("../config");
class HelpCommand {
    constructor() {
        this._keyword = "help";
    }
    help() {
        return "Shows this message";
    }
    runCommand(args, message, bot) {
        if (message.channel.id === ConfigFile.channels.BOT_TESTING ||
            message.channel.id === ConfigFile.channels.TEAM_REGISTRATION) {
            const embed = new Discord.RichEmbed()
                .addField('!team create [name]', 'Create a new team.')
                .addField('!team invite @player', 'Invite a player to your team.')
                .addField('!team kick @player', 'Kick a player from your team.')
                .addField('!team disband', 'Disband your team.')
                .addField('!team info [name]', 'Show team info.')
                .addField('!help', 'Show this message.');
            message.channel.send(embed);
        }
    }
}
exports.default = HelpCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvaGVscENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0M7QUFDdEMsd0NBQXdDO0FBR3hDLE1BQXFCLFdBQVc7SUFBaEM7UUFDYSxhQUFRLEdBQVcsTUFBTSxDQUFDO0lBb0J2QyxDQUFDO0lBbEJHLElBQUk7UUFDQSxPQUFPLG9CQUFvQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQXdCLEVBQUUsR0FBbUI7UUFFcEUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVc7WUFDdEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtZQUM5RCxNQUFNLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ3BDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxvQkFBb0IsQ0FBQztpQkFDckQsUUFBUSxDQUFDLHNCQUFzQixFQUFFLCtCQUErQixDQUFDO2lCQUNqRSxRQUFRLENBQUMsb0JBQW9CLEVBQUUsK0JBQStCLENBQUM7aUJBQy9ELFFBQVEsQ0FBQyxlQUFlLEVBQUUsb0JBQW9CLENBQUM7aUJBQy9DLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQztpQkFDaEQsUUFBUSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztDQUNKO0FBckJELDhCQXFCQyJ9
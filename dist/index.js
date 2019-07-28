"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const ConfigFile = require("./config");
const Database = require("./database");
const ranking_1 = require("./commands/ranking");
const bot = new Discord.Client();
let commands = [];
loadCommands(`${__dirname}/commands`);
bot.on("ready", () => {
    console.log(bot.user.username + ' is online!');
    bot.user.setActivity("ScrimsRL", { type: "PLAYING" });
    var infoChannel = bot.channels.get(ConfigFile.channels.INFO);
    var rulesChannel = bot.channels.get(ConfigFile.channels.RULES);
    var registerTeamChannel = bot.channels.get(ConfigFile.channels.TEAM_REGISTRATION);
    var botTesting = bot.channels.get(ConfigFile.channels.BOT_TESTING);
    var scrimChannel = bot.channels.get(ConfigFile.channels.FIND_A_SCRIM);
    if (!infoChannel || !rulesChannel)
        return;
    infoChannel.fetchMessages().then(messages => {
        console.log('Info Channel messages: ' + messages.size);
        if (messages.size === 0) {
            infoChannel.send({ embed: ConfigFile.infoWelcomeEmbed });
            infoChannel.send({ embed: ConfigFile.infoBotEmbed });
            infoChannel.send({ embed: ConfigFile.infoHelpEmbed });
            infoChannel.send({ embed: ConfigFile.infoRankingEmbed });
            infoChannel.send({ embed: ConfigFile.infoLastBotRestart });
        }
        else {
        }
    });
    rulesChannel.fetchMessages().then(messages => {
        console.log('Rules Channel messages: ' + messages.size);
        if (messages.size === 0)
            rulesChannel.send({ embed: ConfigFile.rulesEmbed });
    });
    registerTeamChannel.fetchMessages().then(messages => {
        console.log('Register Team Channel messages: ' + messages.size);
        if (messages.size === 0)
            registerTeamChannel.send(ConfigFile.registerTeamsMessage);
    });
    Database.initDB();
    setInterval(() => {
        updateRanks(bot);
    }, ConfigFile.config.rankingUpdateInterval);
});
function updateRanks(bot) {
    console.log('Updating ranks...');
    new ranking_1.default().runCommand([], null, bot);
}
bot.on("disconnect", () => {
    console.log(bot.user.username + ' is offline!');
    var scrimChannel = bot.channels.get(ConfigFile.channels.FIND_A_SCRIM);
});
bot.on("guildMemberAdd", member => {
    member.send(`Welcome to our server, ${member}, please read the info and rules channel!`);
    let userRole = member.guild.roles.find(role => role.id === ConfigFile.roles.USER);
    if (userRole)
        member.addRole(userRole);
});
bot.on("message", message => {
    if (message.author.bot) {
        return;
    }
    ;
    if (!message.content.startsWith(ConfigFile.config.prefix)) {
        if (message.channel.id === ConfigFile.channels.FIND_A_SCRIM) {
            message.delete();
        }
        return;
    }
    ;
    handleCommand(message);
});
function loadCommands(commandsPath) {
    if (!ConfigFile.config || ConfigFile.config.commands.length === 0) {
        return;
    }
    for (const commandName of ConfigFile.config.commands) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass();
        command._enabled = true;
        commands.push(command);
    }
}
function handleCommand(message) {
    return __awaiter(this, void 0, void 0, function* () {
        let keyword = message.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
        let args = message.content.split(" ").slice(1);
        if (keyword === "enable") {
            if (!message.member.roles.has(ConfigFile.roles.ADMIN))
                return;
            if (args.length != 1)
                return;
            let command = commands.find(c => c._keyword === args[0]);
            if (command != undefined) {
                command._enabled = true;
                message.channel.send(`The command ${args[0]} is enabled.`);
            }
            return;
        }
        if (keyword === "disable") {
            if (!message.member.roles.has(ConfigFile.roles.ADMIN))
                return;
            if (args.length != 1)
                return;
            let command = commands.find(c => c._keyword === args[0]);
            if (command != undefined) {
                command._enabled = false;
                message.channel.send(`The command ${args[0]} has been disabled.`);
            }
            return;
        }
        for (const command of commands) {
            try {
                if (!(command._keyword === keyword)) {
                    continue;
                }
                if (!command._enabled)
                    return;
                yield command.runCommand(args, message, bot);
            }
            catch (exception) {
                message.channel.send("Error inesperado.");
                console.log(exception);
            }
        }
    });
}
bot.login(ConfigFile.config.token);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFDdkMsdUNBQXVDO0FBRXZDLGdEQUFnRDtBQUVoRCxNQUFNLEdBQUcsR0FBbUIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFakQsSUFBSSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztBQUVqQyxZQUFZLENBQUMsR0FBRyxTQUFTLFdBQVcsQ0FBQyxDQUFDO0FBRXRDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxDQUFDO0lBRS9DLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBRXRELElBQUksV0FBVyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUF3QixDQUFDO0lBQ3BGLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUF3QixDQUFDO0lBQ3RGLElBQUksbUJBQW1CLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBd0IsQ0FBQztJQUN6RyxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBd0IsQ0FBQztJQUMxRixJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFB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
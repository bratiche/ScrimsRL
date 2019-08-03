import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import * as Database from "./database";
import { IBotCommand } from "./api";
import RankingCommand from "./commands/ranking";

const bot: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`);

bot.on("ready", () => {
    console.log(bot.user.username + ' is online!');

    bot.user.setActivity("ScrimsRL", { type: "PLAYING" });

    var infoChannel = bot.channels.get(ConfigFile.channels.INFO) as Discord.TextChannel;
    var rulesChannel = bot.channels.get(ConfigFile.channels.RULES) as Discord.TextChannel;
    var registerTeamChannel = bot.channels.get(ConfigFile.channels.TEAM_REGISTRATION) as Discord.TextChannel;
    var botTesting = bot.channels.get(ConfigFile.channels.BOT_TESTING) as Discord.TextChannel;
    var scrimChannel = bot.channels.get(ConfigFile.channels.FIND_A_SCRIM) as Discord.TextChannel;

    if (!infoChannel || !rulesChannel) return;

    infoChannel.fetchMessages().then(messages => {
        console.log('Info Channel messages: ' + messages.size);
        if (messages.size === 0) {
            infoChannel.send({ embed: ConfigFile.infoWelcomeEmbed });
            infoChannel.send({ embed: ConfigFile.infoBotEmbed });
            infoChannel.send({ embed: ConfigFile.infoHelpEmbed });
            infoChannel.send({ embed: ConfigFile.infoRankingEmbed });
            infoChannel.send({ embed: ConfigFile.infoLastBotRestart });
        } else {
            //infoChannel.bulkDelete(1);
            //infoChannel.send({ embed: ConfigFile.infoLastBotRestart });
        }
    });

    rulesChannel.fetchMessages().then(messages => {
        console.log('Rules Channel messages: ' + messages.size);
        if (messages.size === 0) rulesChannel.send({ embed: ConfigFile.rulesEmbed });
    });

    registerTeamChannel.fetchMessages().then(messages => {
        console.log('Register Team Channel messages: ' + messages.size);
        if (messages.size === 0) registerTeamChannel.send(ConfigFile.registerTeamsMessage);
    });

    //scrimChannel.send("Bot online");

    //botTesting.send({ embed: ConfigFile.infoEmbed });
    //botTesting.send(ConfigFile.config.serverInvite);

    Database.initDB();

    // Set ínterval to update ranks
    updateRanks(bot);
    setInterval(() => {
        updateRanks(bot);
    }, ConfigFile.config.rankingUpdateInterval);
});

function updateRanks(bot: Discord.Client) {
    new RankingCommand().runCommand([], null, bot);
}

bot.on("disconnect", () => {
    console.log(bot.user.username + ' is offline!');

    var scrimChannel = bot.channels.get(ConfigFile.channels.FIND_A_SCRIM) as Discord.TextChannel;
    //scrimChannel.send("Bot offline");
});

bot.on("guildMemberAdd", member => {
    member.send(`Welcome to our server, ${member}, please read the info and rules channel!`);

    let userRole = member.guild.roles.find(role => role.id === ConfigFile.roles.USER);
    if (userRole) member.addRole(userRole);
});

bot.on("message", message => {
    if (message.author.bot) { return; };

    if (!message.content.startsWith(ConfigFile.config.prefix)) {
        // Delete non command messages from the find-a-scrim channel
        if (message.channel.id === ConfigFile.channels.FIND_A_SCRIM) {
            message.delete();
        }
        return;
    };

    handleCommand(message);
});

function loadCommands(commandsPath: string) {
    // Exit if there are no commands
    if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

    for (const commandName of ConfigFile.config.commands as string[]) {
        const commandClass = require(`${commandsPath}/${commandName}`).default; // reflection OP
        const command = new commandClass() as IBotCommand;

        command._enabled = true;
        commands.push(command);
    }
}

async function handleCommand(message: Discord.Message) {
    let keyword = message.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
    let args = message.content.split(" ").slice(1);

    if (keyword === "enable") {
        if (!message.member.roles.has(ConfigFile.roles.ADMIN)) return;
        if (args.length != 1) return;

        let command = commands.find(c => c._keyword === args[0]);
        if (command != undefined) { 
            command._enabled = true;
            message.channel.send(`The command ${args[0]} is enabled.`);
        }
        return;
    }

    if (keyword === "disable") {
        if (!message.member.roles.has(ConfigFile.roles.ADMIN)) return;
        if (args.length != 1) return;

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

            if (!command._enabled) return;

            // Pause execution whilst we run the command
            await command.runCommand(args, message, bot);
        }
        catch (exception) {
            message.channel.send("Error inesperado.");
            console.log(exception);
        }
    }
}

bot.login(ConfigFile.config.token);
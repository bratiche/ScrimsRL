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
const ConfigFile = require("../config");
const scrim_1 = require("./scrim");
const Database = require("../database");
class JoinCommand {
    constructor() {
        this._keyword = "join";
        this._enabled = true;
    }
    help() {
        return "Sends a scrim request to the captain of [team]";
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
        if (args.length === 0) {
            message.reply("Por favor especifica nombre de equipo.");
            return;
        }
        if (args.length != 1) {
            message.reply("Nombre de equipo inválido.");
            return;
        }
        Database.getTeamOf(message.member.id, (requester, err) => {
            if (requester === null) {
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
            Database.getTeamByTag(args[0].toUpperCase(), (receiver, err) => {
                if (receiver === null) {
                    switch (err) {
                        case Database.error.ERROR_PLAYER_NOT_ON_DATABASE:
                            break;
                        case Database.error.ERROR_DUPLICATE_PLAYERS:
                            break;
                        case Database.error.ERROR_TEAM_NOT_ON_DATABASE:
                            message.reply("No hay ningún equipo registrado con ese nombre.");
                            break;
                        case Database.error.ERROR_DUPLICATE_TEAMS:
                            message.channel.send('Hay dos equipos con el mismo tag. Contacta a un Administrador para solucionar el problema.');
                            break;
                        default:
                            break;
                    }
                    return;
                }
                if (requester.name === receiver.name && message.channel.id != ConfigFile.channels.BOT_TESTING) {
                    message.reply("No puedes jugar una scrim contra ti mismo!");
                    return;
                }
                Database.getPlayersFromTeam(receiver.tag, (recvPlayers, err) => {
                    if (err) {
                        switch (err) {
                            case Database.error.ERROR_TEAM_NOT_ON_DATABASE:
                                break;
                            case Database.error.ERROR_DUPLICATE_TEAMS:
                                break;
                        }
                        return;
                    }
                    let player = recvPlayers.find(player => player.captain);
                    if (!player)
                        return;
                    let captain = message.guild.members.find(member => member.id === (!player ? undefined : player.discordUserID));
                    if (!captain)
                        return;
                    if (!scrim_1.scrimMap.has(scrim_1.mapKey(receiver)) || !scrim_1.scrimMap.get(scrim_1.mapKey(receiver)).lfs) {
                        message.reply(`${receiver.tag} ${receiver.name} no está buscando scrim en este momento.`);
                        return;
                    }
                    let requests = scrim_1.scrimMap.get(scrim_1.mapKey(receiver)).requests;
                    if (requests.find(name => name === scrim_1.mapKey(requester))) {
                        message.reply(`Ya le enviaste solicitud de scrim a ${receiver.tag} ${receiver.name}.`);
                        return;
                    }
                    scrim_1.scrimMap.get(scrim_1.mapKey(receiver)).requests.push(scrim_1.mapKey(requester));
                    console.log(scrim_1.scrimMap);
                    const filter = (reaction, user) => {
                        return (['👍', '👎'].find(name => name === reaction.emoji.name) != null) && !user.bot;
                    };
                    let embed = new Discord.RichEmbed({
                        title: `[${requester.tag}] ${requester.name} quiere jugar una scrim`,
                        description: 'Reaccioná a este mensaje para aceptar o rechazar.',
                        footer: {
                            text: 'Powered by ScrimsRL',
                            icon_url: ConfigFile.config.logo,
                        }
                    });
                    captain.send({ embed }).then((embedMessage) => __awaiter(this, void 0, void 0, function* () {
                        let dm = embedMessage;
                        yield dm.react('👍');
                        yield dm.react('👎');
                        let min = 60000;
                        dm.awaitReactions(filter, { max: 1, time: min * 30, errors: ['time'] })
                            .then(collected => {
                            const reaction = collected.first();
                            if (!scrim_1.scrimMap.has(scrim_1.mapKey(receiver)) || !scrim_1.scrimMap.get(scrim_1.mapKey(receiver)).lfs) {
                                dm.channel.send("La solicitud ha caducado porque ya no estás buscando scrim.");
                                return;
                            }
                            if (reaction.emoji.name === '👍') {
                                let fieldValue = `[${receiver.tag}] ${receiver.name} ha dejado de buscar scrim`;
                                let otherTeamScrimInfo = scrim_1.scrimMap.get(scrim_1.mapKey(receiver));
                                otherTeamScrimInfo.lfs = false;
                                otherTeamScrimInfo.requests = [];
                                if (scrim_1.scrimMap.has(scrim_1.mapKey(requester)) && scrim_1.scrimMap.get(scrim_1.mapKey(requester)).lfs) {
                                    fieldValue += `\n[${requester.tag}] ${requester.name} ha dejado de buscar scrim`;
                                    let scrimInfo = scrim_1.scrimMap.get(scrim_1.mapKey(requester));
                                    scrimInfo.lfs = false;
                                    scrimInfo.requests = [];
                                }
                                const leaveMessage = new Discord.RichEmbed();
                                leaveMessage.addField('Scrim aceptada', fieldValue);
                                leaveMessage.setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                                message.channel.send(leaveMessage);
                                console.log(scrim_1.scrimMap);
                                Database.getPlayersFromTeam(requester.tag, (reqPlayers, err) => {
                                    if (err) {
                                        switch (err) {
                                            case Database.error.ERROR_TEAM_NOT_ON_DATABASE:
                                                break;
                                            case Database.error.ERROR_DUPLICATE_TEAMS:
                                                break;
                                        }
                                        return;
                                    }
                                    let channelName = receiver.tag.toLowerCase() + '-vs-' + requester.tag.toLowerCase();
                                    this.createChannel(message.guild, channelName, reqPlayers.concat(recvPlayers));
                                    let acceptedDirectMessage = new Discord.RichEmbed()
                                        .setTitle('Scrim aceptada')
                                        .setDescription(`Dirigete al canal ${channelName} para organizar el partido con tu oponente`)
                                        .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                                    dm.channel.send(acceptedDirectMessage).then().catch(exception => {
                                        console.log(exception);
                                    });
                                    message.member.send(acceptedDirectMessage).then().catch(exception => {
                                        console.log(exception);
                                    });
                                });
                            }
                            else {
                                let declinedDirectMessage = new Discord.RichEmbed()
                                    .setTitle('Scrim rechazada')
                                    .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                                dm.channel.send(declinedDirectMessage).then().catch(exception => {
                                    console.log(exception);
                                });
                                declinedDirectMessage = new Discord.RichEmbed()
                                    .setTitle(`[${receiver.tag}] ${receiver.name} ha rechazado tu solicitud de scrim`)
                                    .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                                message.member.send(declinedDirectMessage).then().catch(exception => {
                                    console.log(exception);
                                });
                                let filtered = scrim_1.scrimMap.get(scrim_1.mapKey(receiver)).requests.filter(name => name !== scrim_1.mapKey(requester));
                                scrim_1.scrimMap.get(scrim_1.mapKey(receiver)).requests = filtered;
                                console.log(scrim_1.scrimMap);
                            }
                        })
                            .catch(collected => {
                            let declinedDirectMessage = new Discord.RichEmbed()
                                .setTitle(`Scrim contra [${requester.tag}] ${requester.name} rechazada (timeout)`)
                                .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                            dm.channel.send(declinedDirectMessage).then().catch(exception => {
                                console.log(exception);
                            });
                            declinedDirectMessage = new Discord.RichEmbed()
                                .setTitle(`[${receiver.tag}] ${receiver.name} ha rechazado tu solicitud de scrim (timeout)`)
                                .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                            message.member.send(declinedDirectMessage).then().catch(exception => {
                                console.log(exception);
                            });
                            let filtered = scrim_1.scrimMap.get(scrim_1.mapKey(receiver)).requests.filter(name => name !== scrim_1.mapKey(requester));
                            scrim_1.scrimMap.get(scrim_1.mapKey(receiver)).requests = filtered;
                            console.log("Reaction timeout");
                            console.log(scrim_1.scrimMap);
                        });
                    }));
                });
            });
        });
    }
    createChannel(guild, channelName, players) {
        let permissions = [
            {
                deny: 0x400,
                id: guild.defaultRole,
            },
            {
                deny: 0x400,
                id: ConfigFile.roles.USER,
            },
        ];
        console.log(players);
        players.forEach(player => {
            if (player.discordUserID)
                permissions.push({
                    allow: 0x400 | 0x800,
                    id: player.discordUserID,
                });
        });
        guild.createChannel(channelName, {
            type: "text",
            parent: ConfigFile.categories.SCRIMS,
            permissionOverwrites: permissions,
        }).then(c => {
            const channel = c;
            channel.send('Usar este canal para organizar la partida, escribir !close para terminar.');
            const messageFilter = (channelMessage, user) => {
                return channelMessage.content === '!close';
            };
            channel.awaitMessages(messageFilter, { maxMatches: 1 }).then(collected => {
                console.log(collected.first().content);
                channel.delete();
            }).catch(collected => {
                console.log(collected);
            });
        }).catch(exception => {
            console.log(exception);
        });
    }
}
exports.default = JoinCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9qb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsd0NBQXdDO0FBRXhDLG1DQUFzRDtBQUN0RCx3Q0FBd0M7QUFFeEMsTUFBcUIsV0FBVztJQUFoQztRQUNhLGFBQVEsR0FBVyxNQUFNLENBQUM7UUFDbkMsYUFBUSxHQUFZLElBQUksQ0FBQztJQWdUN0IsQ0FBQztJQTlTRyxJQUFJO1FBQ0EsT0FBTyxnREFBZ0QsQ0FBQztJQUM1RCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxPQUF3QixFQUFFLEdBQW1CO1FBQ3BFLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZO1lBQ3ZELE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3hELE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO1lBQ3JFLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQ3hELE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1lBQzNDLE9BQU87U0FDVjtRQUVELFFBQVEsQ0FBQyxTQUFTLENB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
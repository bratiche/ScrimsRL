import * as Discord from "discord.js";
import * as ConfigFile from "../config";
import { IBotCommand } from "../api";
import { scrimMap, ScrimInfo, mapKey } from "./scrim";
import * as Database from "../database";

export default class JoinCommand implements IBotCommand {
    readonly _keyword: string = "join";
    _enabled: boolean = true;

    help(): string {
        return "Sends a scrim request to the captain of [team]";
    }

    runCommand(args: string[], message: Discord.Message, bot: Discord.Client): void {
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
            message.reply("Nombre de equipo inválido.")
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
                        // unexpected error
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
                            // unexpected error
                            break;
                    }
                    return;
                }

                if (requester.name === receiver.name && message.channel.id != ConfigFile.channels.BOT_TESTING) {
                    //error: cant join yourself
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

                    // find captain of other team
                    let player = recvPlayers.find(player => player.captain);

                    if (!player) return;

                    let captain = message.guild.members.find(member => member.id === (!player ? undefined : player.discordUserID));
                    // error
                    if (!captain) return;

                    if (!scrimMap.has(mapKey(receiver)) || !(scrimMap.get(mapKey(receiver)) as ScrimInfo).lfs) {
                        message.reply(`${receiver.tag} ${receiver.name} no está buscando scrim en este momento.`);
                        return;
                    }

                    let requests = (scrimMap.get(mapKey(receiver)) as ScrimInfo).requests as string[];
                    if (requests.find(name => name === mapKey(requester))) {
                        message.reply(`Ya le enviaste solicitud de scrim a ${receiver.tag} ${receiver.name}.`);
                        return;
                    }

                    // add requester to list
                    ((scrimMap.get(mapKey(receiver)) as ScrimInfo).requests as string[]).push(mapKey(requester));
                    console.log(scrimMap);

                    // Create filter for reaction: filter emojis, i know its a dm so i dont need to check for user id,
                    // also filter bot reactions so i can test own requests
                    const filter = (reaction: Discord.MessageReaction, user: Discord.User) => {
                        return (['👍', '👎'].find(name => name === reaction.emoji.name) != null) && !user.bot;
                    };

                    // send dm to other team captain
                    let embed = new Discord.RichEmbed({
                        title: `[${requester.tag}] ${requester.name} quiere jugar una scrim`,
                        description: 'Reaccioná a este mensaje para aceptar o rechazar.',
                        footer: {
                            text: 'Powered by ScrimsRL',
                            icon_url: ConfigFile.config.logo,
                        }
                    });

                    // send dm to captain
                    captain.send({ embed }).then(async embedMessage => {
                        let dm = (embedMessage as Discord.Message);
                        await dm.react('👍');
                        await dm.react('👎');

                        let min = 60000;
                        dm.awaitReactions(filter, { max: 1, time: min * 30, errors: ['time'] })
                            .then(collected => {
                                const reaction = collected.first();

                                // User reacted after timeout or !leave
                                if (!scrimMap.has(mapKey(receiver)) || !(scrimMap.get(mapKey(receiver)) as ScrimInfo).lfs) {
                                    dm.channel.send("La solicitud ha caducado porque ya no estás buscando scrim.");
                                    return;
                                }

                                // Scrim aceptada
                                if (reaction.emoji.name === '👍') {
                                    // Set both teams LFS to false since they are no longer looking for scrim
                                    let fieldValue = `[${receiver.tag}] ${receiver.name} ha dejado de buscar scrim`;
                                    let otherTeamScrimInfo = scrimMap.get(mapKey(receiver)) as ScrimInfo;
                                    otherTeamScrimInfo.lfs = false;
                                    otherTeamScrimInfo.requests = [];

                                    // if the requester was also lfs 
                                    if (scrimMap.has(mapKey(requester)) && (scrimMap.get(mapKey(requester)) as ScrimInfo).lfs) {
                                        fieldValue += `\n[${requester.tag}] ${requester.name} ha dejado de buscar scrim`;
                                        let scrimInfo = scrimMap.get(mapKey(requester)) as ScrimInfo;
                                        scrimInfo.lfs = false;
                                        scrimInfo.requests = [];
                                    }

                                    const leaveMessage = new Discord.RichEmbed();
                                    leaveMessage.addField('Scrim aceptada', fieldValue);
                                    leaveMessage.setFooter('Powered by ScrimsRL', ConfigFile.config.logo);
                                    message.channel.send(leaveMessage);

                                    console.log(scrimMap);

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

                                        // send confirmation message
                                        dm.channel.send(acceptedDirectMessage).then().catch(exception => {
                                            console.log(exception);
                                        });

                                        // send message to requester
                                        message.member.send(acceptedDirectMessage).then().catch(exception => {
                                            console.log(exception);
                                        });
                                    });
                                }

                                // Scrim rechazada
                                else {
                                    let declinedDirectMessage = new Discord.RichEmbed()
                                        .setTitle('Scrim rechazada')
                                        .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);

                                    // send confirmation message
                                    dm.channel.send(declinedDirectMessage).then().catch(exception => {
                                        console.log(exception);
                                    });

                                    declinedDirectMessage = new Discord.RichEmbed()
                                        .setTitle(`[${receiver.tag}] ${receiver.name} ha rechazado tu solicitud de scrim`)
                                        .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);

                                    // send message to requester
                                    message.member.send(declinedDirectMessage).then().catch(exception => {
                                        console.log(exception);
                                    });

                                    // remove requester from value
                                    let filtered = ((scrimMap.get(mapKey(receiver)) as ScrimInfo).requests as string[]).filter(name => name !== mapKey(requester));
                                    (scrimMap.get(mapKey(receiver)) as ScrimInfo).requests = filtered;

                                    console.log(scrimMap);
                                }
                            })
                            .catch(collected => {
                                // TODO checkear
                                // Reaction timeout => decline scrim
                                let declinedDirectMessage = new Discord.RichEmbed()
                                    .setTitle(`Scrim contra [${requester.tag}] ${requester.name} rechazada (timeout)`)
                                    .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);

                                // send confirmation message
                                dm.channel.send(declinedDirectMessage).then().catch(exception => {
                                    console.log(exception);
                                });

                                declinedDirectMessage = new Discord.RichEmbed()
                                    .setTitle(`[${receiver.tag}] ${receiver.name} ha rechazado tu solicitud de scrim (timeout)`)
                                    .setFooter('Powered by ScrimsRL', ConfigFile.config.logo);

                                // send message to requester
                                message.member.send(declinedDirectMessage).then().catch(exception => {
                                    console.log(exception);
                                });

                                // remove requester from value
                                let filtered = ((scrimMap.get(mapKey(receiver)) as ScrimInfo).requests as string[]).filter(name => name !== mapKey(requester));
                                (scrimMap.get(mapKey(receiver)) as ScrimInfo).requests = filtered;

                                console.log("Reaction timeout")
                                console.log(scrimMap);
                            });
                    });
                });
            });

        });
    }

    createChannel(guild: Discord.Guild, channelName: string, players: Database.Player[]): void {
        let permissions: Discord.ChannelCreationOverwrites[] = [
            {
                deny: 0x400,
                id: guild.defaultRole, // @everyone
            },
            {
                deny: 0x400,
                id: ConfigFile.roles.USER, // @User
            },

        ];

        console.log(players);
        players.forEach(player => {
            if (player.discordUserID)
                permissions.push(
                    {
                        allow: 0x400 | 0x800,
                        id: player.discordUserID,
                    });
        });

        // create team-vs-team channel
        guild.createChannel(channelName, {
            type: "text",
            parent: ConfigFile.categories.SCRIMS,
            permissionOverwrites: permissions,
        }).then(c => {
            const channel = c as Discord.TextChannel;
            channel.send('Usar este canal para organizar la partida, escribir !close para terminar.');

            // close command (delete channel)
            const messageFilter = (channelMessage: Discord.Message, user: Discord.User) => {
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
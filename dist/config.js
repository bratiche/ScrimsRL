"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = {
    "token": "NTgzNzY4Njk1OTc3OTM0ODQ5.XPBLaA.lS2NT-QO4dX7MRz2VU3n393HzkU",
    "prefix": "!",
    "commands": [
        "help",
        "clear",
        "scrim",
        "leave",
        "join",
        "status",
        "update",
        "ranking",
        "info",
    ],
    "logo": "https://cdn.discordapp.com/attachments/585317290556522517/585577711913795595/Logo_Scrims.png",
    "scrimTimeout": 3600,
    "rankingUpdateInterval": 1000 * 60 * 60 * 6,
};
exports.categories = {
    "SCRIMS": "583540133257805855",
};
exports.channels = {
    "TEAM_REGISTRATION": '583549570672230401',
    "FIND_A_SCRIM": '583540105701228546',
    "BOT_TESTING": '593494731141546004',
    "RANKING": '583721958777290757',
    "INFO": '583540774663225346',
    "RULES": '583540884210057236',
    "TEAMS": '585519143487275009',
    "STATS_ADIM": '585285052821274634',
};
exports.roles = {
    "PLAYER": "584104774845202467",
    "CAPTAIN": "583722099479150620",
    "USER": "583537096787099648",
    "ADMIN": "583536401178558464",
    "MODERATOR": "583707253132099596",
};
exports.infoWelcomeEmbed = {
    color: 0x0099ff,
    title: 'Bienvenido a ScrimsRL!',
    description: 'Éste servidor fue creado para facilitar la organización de scrims entre equipos.',
    thumbnail: {
        url: exports.config.logo,
    },
    fields: [
        {
            name: 'Cómo usar el servidor?',
            value: `:small_orange_diamond: 1  - Registrá a tu equipo en <#${exports.channels.TEAM_REGISTRATION}>
            :small_orange_diamond: 2 - Buscá scrims en <#${exports.channels.FIND_A_SCRIM}>
            :small_orange_diamond: 3 - Acordá con algún equipo y procedé a jugar!`
        },
    ],
};
exports.infoBotEmbed = {
    color: 0x0099ff,
    title: 'Cómo funciona el bot?',
    description: 'Explicar funcionamiento del bot.',
};
exports.infoRankingEmbed = {
    color: 0x0099ff,
    title: 'Sistema de ranking',
    description: 'Explicar como funciona el canal de ranking',
};
exports.infoLastBotRestart = {
    timestamp: new Date(),
    footer: {
        text: 'Last bot restart',
        icon_url: exports.config.logo,
    },
};
exports.infoHelpEmbed = {
    title: "Comandos",
    fields: [
        {
            name: '!scrim',
            value: 'Publicar un anuncio de buscando scrim.'
        },
        {
            name: '!leave',
            value: 'Dejar de buscar scrim.'
        },
        {
            name: '!join [team]',
            value: 'Enviar una solicitud de scrim al equipo [team].'
        },
        {
            name: '!status',
            value: 'Listar los equipos que están buscando scrim.'
        },
        {
            name: '!info [team]',
            value: 'Muestra información sobre el equipo [team].'
        },
        {
            name: '!help',
            value: 'Mostrar este mensaje.'
        },
    ],
};
exports.rulesEmbed = {
    color: 0x0099ff,
    title: 'Reglas de ScrimsRL!',
    description: `:small_orange_diamond: Ser amable con las personas, no ser toxico.
    :small_orange_diamond: Prohibido el spam.
    :small_orange_diamond: Si un usuario está incumpliendo las reglas, puedes reportarlo y tendrá su sanción.
    :small_orange_diamond: Utiliza los canales adecuadamente.
    :small_orange_diamond: Realizar eventos en nuestra comunidad sin permiso de un administrador será sancionado.`,
    timestamp: new Date(),
    footer: {
        text: 'Última actualización',
    },
};
exports.registerTeamsMessage = `@everyone Para registrar a tu equipo, necesitas completar los siguientes datos y enviarlos a un <@&${exports.roles.ADMIN}> o <@&${exports.roles.MODERATOR}>\n\
\n\
[TAG] (Nombre del equipo)\n\
\n\
:regional_indicator_c: (Nombre del jugador) [platform] [id]\n\
:small_orange_diamond: (Nombre del jugador) [platform] [id]\n\
:small_orange_diamond: (Nombre del jugador) [platform] [id]\n\
\n\
El jugador con la letra :regional_indicator_c: será el capitán del equipo.
Máximo 6 jugadores por equipo.
[platform]: pc, psn, xbox
\n\
:heavy_minus_sign: :heavy_minus_sign: Ejemplo: :heavy_minus_sign: :heavy_minus_sign:\n\
\n\
[7RE] 7R eSports\n\
\n\
:regional_indicator_c: Eze pc ezedoriuxblack\n\
:small_orange_diamond: Bratiche pc bratiche\n\
:small_orange_diamond: Aeros pc 76561198936943906`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFXLFFBQUEsTUFBTSxHQUFHO0lBQ2hCLE9BQU8sRUFBRSw2REFBNkQ7SUFDdEUsUUFBUSxFQUFFLEdBQUc7SUFDYixVQUFVLEVBQUU7UUFDUixNQUFNO1FBQ04sT0FBTztRQUNQLE9BQU87UUFDUCxPQUFPO1FBQ1AsTUFBTTtRQUNOLFFBQVE7UUFDUixRQUFRO1FBQ1IsU0FBUztRQUNULE1BQU07S0FDVDtJQUNELE1BQU0sRUFBRSw4RkFBOEY7SUFDdEcsY0FBYyxFQUFFLElBQUk7SUFDcEIsdUJBQXVCLEVBQUUsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztDQUM5QyxDQUFDO0FBRVMsUUFBQSxVQUFVLEdBQUc7SUFDcEIsUUFBUSxFQUFFLG9CQUFvQjtDQUNqQyxDQUFDO0FBR1MsUUFBQSxRQUFRLEdBQUc7SUFDbEIsbUJBQW1CLEVBQUUsb0JBQW9CO0lBQ3pDLGNBQWMsRUFBRSxvQkFBb0I7SUFDcEMsYUFBYSxFQUFFLG9CQUFvQjtJQUNuQyxTQUFTLEVBQUUsb0JBQW9CO0lBQy9CLE1BQU0sRUFBRSxvQkFBb0I7SUFDNUIsT0FBTyxFQUFFLG9CQUFvQjtJQUM3QixPQUFPLEVBQUUsb0JBQW9CO0lBQzdCLFlBQVksRUFBRSxvQkFBb0I7Q0FDckMsQ0FBQztBQUVTLFFBQUEsS0FBSyxHQUFHO0lBQ2YsUUFBUSxFQUFFLG9CQUFvQjtJQUM5QixTQUFTLEVBQUUsb0JBQW9CO0lBQy9CLE1BQU0sRUFBRSxvQkFBb0I7SUFDNUIsT0FBTyxFQUFFLG9CQUFvQjtJQUM3QixXQUFXLEVBQUUsb0JBQW9CO0NBQ3BDLENBQUM7QUFHVyxRQUFBLGdCQUFnQixHQUFHO0lBQzVCLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLHdCQUF3QjtJQUMvQixXQUFXLEVBQUUsa0ZBQWtGO0lBQy9GLFNBQVMsRUFBRTtRQUNQLEdBQUcsRUFBRSxjQUFNLENBQUMsSUFBSTtLQUNuQjtJQUNELE1BQU0sRUFBRTtRQUNKO1lBQ0ksSUFBSSxFQUFFLHdCQUF3QjtZQUM5QixLQUFLLEVBQUUseURBQXlELGdCQUFRLENBQUMsaUJBQWlCOzJEQUMzQyxnQkFBUSxDQUFDLFlBQVk7a0ZBQ0U7U0FDekU7S0FDSjtDQVFKLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRztJQUN4QixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSx1QkFBdUI7SUFDOUIsV0FBVyxFQUFFLGtDQUFrQztDQUNsRCxDQUFBO0FBRVksUUFBQSxnQkFBZ0IsR0FBRztJQUM1QixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxvQkFBb0I7SUFDM0IsV0FBVyxFQUFFLDRDQUE0QztDQUM1RCxDQUFBO0FBRVksUUFBQSxrQkFBa0IsR0FBRztJQUM5QixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7SUFDckIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixRQUFRLEVBQUUsY0FBTSxDQUFDLElBQUk7S0FDeEI7Q0FDSixDQUFBO0FBRVksUUFBQSxhQUFhLEdBQUc7SUFDekIsS0FBSyxFQUFFLFVBQVU7SUFDakIsTUFBTSxFQUFFO1FBQ0o7WUFDSSxJQUFJLEVBQUUsUUFBUTtZQUNkLEtBQUssRUFBRSx3Q0FBd0M7U0FDbEQ7UUFDRDtZQUNJLElBQUksRUFBRSxRQUFRO1lBQ2QsS0FBSyxFQUFFLHdCQUF3QjtTQUNsQztRQUNEO1lBQ0ksSUFBSSxFQUFFLGNBQWM7WUFDcEIsS0FBSyxFQUFFLGlEQUFpRDtTQUMzRDtRQUNEO1lBQ0ksSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsOENBQThDO1NBQ3hEO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsY0FBYztZQUNwQixLQUFLLEVBQUUsNkNBQTZDO1NBQ3ZEO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSx1QkFBdUI7U0FDakM7S0FDSjtDQUNKLENBQUE7QUFFWSxRQUFBLFVBQVUsR0FBRztJQUN0QixLQUFLLEVBQUUsUUFBUTtJQUNmLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsV0FBVyxFQUFFOzs7O2tIQUlpRztJQUM5RyxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7SUFDckIsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLHNCQUFzQjtLQUMvQjtDQUNKLENBQUM7QUFFVyxRQUFBLG9CQUFvQixHQUFHLHNHQUFzRyxhQUFLLENBQUMsS0FBSyxVQUFVLGFBQUssQ0FBQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0RBa0I1SCxDQUFDIn0=
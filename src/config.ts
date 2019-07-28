export let config = {
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
    "rankingUpdateInterval": 1000 * 60 * 60 * 6, // 6 hours
};

export let categories = {
    "SCRIMS": "583540133257805855",
};

//TODO change names and lower case
export let channels = {
    "TEAM_REGISTRATION": '583549570672230401',
    "FIND_A_SCRIM": '583540105701228546',
    "BOT_TESTING": '593494731141546004',
    "RANKING": '583721958777290757',
    "INFO": '583540774663225346',
    "RULES": '583540884210057236',
    "TEAMS": '585519143487275009',
    "STATS_ADIM": '585285052821274634',
};

export let roles = {
    "PLAYER": "584104774845202467",
    "CAPTAIN": "583722099479150620",
    "USER": "583537096787099648",
    "ADMIN": "583536401178558464",
    "MODERATOR": "583707253132099596",
};

// Messages
export const infoWelcomeEmbed = {
    color: 0x0099ff,
    title: 'Bienvenido a ScrimsRL!',
    description: 'Éste servidor fue creado para facilitar la organización de scrims entre equipos.',
    thumbnail: {
        url: config.logo,
    },
    fields: [
        {
            name: 'Cómo usar el servidor?',
            value: `:small_orange_diamond: 1  - Registrá a tu equipo en <#${channels.TEAM_REGISTRATION}>
            :small_orange_diamond: 2 - Buscá scrims en <#${channels.FIND_A_SCRIM}>
            :small_orange_diamond: 3 - Acordá con algún equipo y procedé a jugar!`
        },
    ],
    // image: {
    //     url: 'https://cdn.discordapp.com/attachments/585317290556522517/585577711913795595/Logo_Scrims.png',
    // },
    // footer: {
    // 	text: 'Some footer text here',
    // 	icon_url: 'https://cdn.discordapp.com/attachments/585317290556522517/585577711913795595/Logo_Scrims.png',
    // },
};

export const infoBotEmbed = {
    color: 0x0099ff,
    title: 'Cómo funciona el bot?',
    description: 'Explicar funcionamiento del bot.',
}

export const infoRankingEmbed = {
    color: 0x0099ff,
    title: 'Sistema de ranking',
    description: 'Explicar como funciona el canal de ranking',
}

export const infoLastBotRestart = {
    timestamp: new Date(),
    footer: {
        text: 'Last bot restart',
        icon_url: config.logo,
    },
}

export const infoHelpEmbed = {
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
}

export const rulesEmbed = {
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

export const registerTeamsMessage = `@everyone Para registrar a tu equipo, necesitas completar los siguientes datos y enviarlos a un <@&${roles.ADMIN}> o <@&${roles.MODERATOR}>\n\
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
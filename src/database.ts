import * as MySQL from "mysql";

export type Team = {
    tag: string,
    name: string,
}

export type Player = {
    name: string,
    discordUserID: string | null,
    captain: boolean,
    platform: string,
    id: string,
    team: Team,
}

var con: MySQL.Connection;

export function initDB() {
    con = MySQL.createConnection({
        host: "localhost",
        user: "root",
        password: "pokerdeASES007",
        database: "scrimsdb",
    });

    con.connect(err => {
        if (err) throw err;

        console.log("Connected to database!");

        let createTeamsTable = `CREATE TABLE IF NOT EXISTS teams(
            teamID INT AUTO_INCREMENT PRIMARY KEY,
            teamName VARCHAR(50) NOT NULL,
            teamTag VARCHAR(6) NOT NULL
        );`;

        let createPlayersTable = `CREATE TABLE IF NOT EXISTS players(
            playerName VARCHAR(30) NOT NULL,
            discordUserID VARCHAR(30),
            captain BOOLEAN DEFAULT false,
            platform ENUM ('steam', 'psn', 'xbox') NOT NULL, 
            id VARCHAR(255) NOT NULL,
            teamID INT NOT NULL,
            FOREIGN KEY team(teamID) REFERENCES teams(teamID)
        );`;

        con.query(createTeamsTable);
        con.query(createPlayersTable);
    });

    // keep connection alive (it would be better to handle disconnect)
    setInterval(() => {
        con.query('SELECT 1;');
    }, 1000 * 60 * 60);
}

export function addPlayer(player: Player) {
    con.query(`SELECT teamID FROM teams WHERE teamName = "${player.team.name}" AND teamTag = '${player.team.tag}';`, (err, rows) => {
        if (err) throw err;

        if (rows.length == 0) return console.log("No team found");
        if (rows.length != 1) return console.log("Duplicate Teams!");

        // Add player to database
        let teamID = rows[0].teamID;
        con.query(`INSERT INTO players (playerName, discordUserID, captain, platform, id, teamID) 
        VALUES ("${player.name}", "${player.discordUserID}", ${player.captain}, '${player.platform}', '${player.id}', ${teamID});`);
    });
}

function removePlayer(discordTag: string) {
    //remove player
}

function updatePlayer(player: Player) {

}

// UNUSED
export function getPlayer(playerName?: string, discordUserID?: string): Player | null {
    let player: Player | null = null;

    let query;

    if (discordUserID != undefined) {
        query = `SELECT * FROM players WHERE discordUserID = '${discordUserID}';`
    } else {
        query = `SELECT * FROM players WHERE playerName = "${playerName}";`
    }

    con.query(query, (err, rows) => {
        if (err) throw err;

        if (rows.length == 0) return console.log("No player found");
        if (rows.length != 1) return console.log("Duplicate players!");

        let teamID = rows[0].teamID;
        let team: Team;

        con.query(`SELECT * FROM teams WHERE teamID = ${teamID};`, (err, teamRows) => {
            if (err) throw err;

            if (teamRows.length == 0) return console.log("No team found");
            if (teamRows.length != 1) return console.log("Duplicate Teams!");

            team.name = teamRows[0].teamName;
            team.tag = teamRows[0].teamTag;

            player = {
                name: rows[0].playerName, discordUserID: rows[0].discordUserID,
                captain: rows[0].captain, platform: rows[0].platform, id: rows[0].id, team: team
            };
        });
    });

    console.log(player);

    return player;
}

export function getPlayersFromTeam(teamTag: string, callback: (players: Player[], err?: error) => void): void {
    let players: Player[] = [];

    con.query(`SELECT * FROM teams WHERE teamTag = '${teamTag}';`, (err, teams) => {
        if (err) throw err;

        if (teams.length === 0) return callback([], error.ERROR_TEAM_NOT_ON_DATABASE);
        if (teams.length !== 1) return callback([], error.ERROR_DUPLICATE_TEAMS); // teams con el mismo tag

        con.query(`SELECT * FROM players WHERE teamID = ${teams[0].teamID};`, (err, rows) => {
            if (err) throw err;

            for (let i = 0; i < rows.length; i++) {
                const team: Team = {
                    name: teams[0].teamName,
                    tag: teams[0].teamTag,
                };

                const player: Player = {
                    name: rows[i].playerName, discordUserID: rows[i].discordUserID,
                    captain: rows[i].captain === 1, platform: rows[i].platform, id: rows[i].id, team: team,
                };

                players.push(player);
            }

            return callback(players);
        });

    });
}

export function addTeam(team: Team) {
    con.query(`INSERT INTO teams (teamName, teamTag) VALUES ("${team.name}", '${team.tag}');`);
}

export function getTeams(callback: (teams: Team[]) => void): void {
    let teams: Team[] = [];

    con.query(`SELECT * FROM teams;`, (err, rows) => {
        if (err) throw err;

        for (let i = 0; i < rows.length; i++) {
            const team: Team = {
                name: rows[i].teamName,
                tag: rows[i].teamTag,
            };
            teams.push(team);
        }

        return callback(teams);
    });
}

function removeTeam(tag: string, name: string) {
    // delete team and players from that team
}

function updateTeam(oldTeam: Team, newTeam: Team) {

}

export enum error {
    ERROR_PLAYER_NOT_ON_DATABASE = 1,
    ERROR_DUPLICATE_PLAYERS,
    ERROR_TEAM_NOT_ON_DATABASE,
    ERROR_DUPLICATE_TEAMS
}

export function getTeamOf(discordUserID: string, callback: (team: Team | null, err?: error) => void) {
    con.query(`SELECT * FROM players WHERE discordUserID = "${discordUserID}";`, (err, players) => {
        if (err) throw err;

        // error player not on database
        if (players.length === 0) return callback(null, error.ERROR_PLAYER_NOT_ON_DATABASE);
        // error 2 players with the same id
        if (players.length !== 1) return callback(null, error.ERROR_DUPLICATE_PLAYERS);

        // ver si se puede reemplazar esto por getTeamByID();
        con.query(`SELECT * FROM teams WHERE teamID = ${players[0].teamID};`, (err, teams) => {
            if (err) throw err;

            // error team not on database
            if (teams.length === 0) return callback(null, error.ERROR_TEAM_NOT_ON_DATABASE);
            // error 2 teams with the same tag
            if (teams.length !== 1) return callback(null, error.ERROR_DUPLICATE_TEAMS);

            let team: Team = {
                name: teams[0].teamName,
                tag: teams[0].teamTag,
            };

            return callback(team);
        });
    });
}

export function getTeamByTag(teamTag: string, callback: (team: Team | null, err?: error) => void) {
    con.query(`SELECT * FROM teams WHERE teamTag = '${teamTag}';`, (err, teams) => {
        if (err) throw err;

        // error team not on database
        if (teams.length === 0) return callback(null, error.ERROR_TEAM_NOT_ON_DATABASE);
        // error 2 teams with the same tag
        if (teams.length !== 1) return callback(null, error.ERROR_DUPLICATE_TEAMS);;

        let team: Team = {
            name: teams[0].teamName,
            tag: teams[0].teamTag,
        };

        return callback(team);
    });
}

// remove all rows from all tables
export function flush() {
    con.query('DELETE FROM players;');
    con.query('DELETE FROM teams;');
    console.log('Database flushed!');
}

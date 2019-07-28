"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFile = require("../config");
const Database = require("../database");
class UpdateCommand {
    constructor() {
        this._keyword = "update";
        this._enabled = true;
    }
    help() {
        return "Updates database using info from #teams";
    }
    runCommand(args, message, bot) {
        if (!message.member.roles.has(ConfigFile.roles.ADMIN))
            return;
        let teamsChannel = bot.channels.find(channel => channel.id === ConfigFile.channels.TEAMS);
        message.delete();
        console.log('Updating database...');
        Database.flush();
        teamsChannel.fetchMessages().then(messages => {
            messages.forEach(message => {
                let lines = message.content.split('\n');
                let teamTag = lines[0].split('] ').filter(e => e.trim().length > 0)[0];
                let teamName = lines[0].split('] ').filter(e => e.trim().length > 0)[1];
                let players = lines.slice(2);
                let team = { name: teamName, tag: teamTag.slice(1) };
                Database.addTeam(team);
                players.forEach(p => {
                    let captain = p.split(/(\s+)/).filter(e => e.trim().length > 0)[0];
                    let playerName = p.split(/(\s+)/).filter(e => e.trim().length > 0)[1];
                    let platform = p.split(/(\s+)/).filter(e => e.trim().length > 0)[2];
                    let id = p.split(/(\s+)/).filter(e => e.trim().length > 0)[3];
                    let discordUserID = p.split(/(\s+)/).filter(e => e.trim().length > 0)[4];
                    if (platform.toLowerCase() === 'pc')
                        platform = 'steam';
                    if (discordUserID) {
                        if (discordUserID.includes("!")) {
                            discordUserID = discordUserID.split("!")[1].split(">")[0];
                        }
                        else {
                            discordUserID = discordUserID.split("@")[1].split(">")[0];
                        }
                    }
                    let player = {
                        name: playerName,
                        discordUserID: discordUserID,
                        captain: captain === '🇨',
                        platform: platform,
                        id: id,
                        team: team,
                    };
                    Database.addPlayer(player);
                });
            });
        });
    }
}
exports.default = UpdateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHdDQUF3QztBQUN4Qyx3Q0FBd0M7QUFHeEMsTUFBcUIsYUFBYTtJQUFsQztRQUNhLGFBQVEsR0FBVyxRQUFRLENBQUM7UUFDckMsYUFBUSxHQUFZLElBQUksQ0FBQztJQTBEN0IsQ0FBQztJQXhERyxJQUFJO1FBQ0EsT0FBTyx5Q0FBeUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxPQUF3QixFQUFFLEdBQW1CO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFBRSxPQUFPO1FBRTlELElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBd0IsQ0FBQztRQUVqSCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXBDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVqQixZQUFZLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFB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
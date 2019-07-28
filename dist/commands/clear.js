"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFile = require("../config");
class ClearCommand {
    constructor() {
        this._keyword = "clear";
        this._enabled = true;
    }
    help() {
        return "This command clears messages from the channel!";
    }
    runCommand(args, message, bot) {
        if (message.channel.type === "dm")
            return;
        if (message.member.roles.find(role => role.id === ConfigFile.roles.ADMIN) ||
            message.member.roles.find(role => role.id === ConfigFile.roles.MODERATOR)) {
            message.channel.bulkDelete(100);
        }
    }
}
exports.default = ClearCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvY2xlYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx3Q0FBd0M7QUFHeEMsTUFBcUIsWUFBWTtJQUFqQztRQUNhLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFDcEMsYUFBUSxHQUFZLElBQUksQ0FBQztJQWM3QixDQUFDO0lBWkcsSUFBSTtRQUNBLE9BQU8sZ0RBQWdELENBQUM7SUFDNUQsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFjLEVBQUUsT0FBd0IsRUFBRSxHQUFtQjtRQUNwRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUk7WUFBRSxPQUFPO1FBRTFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNyRSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDM0UsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDO0NBQ0o7QUFoQkQsK0JBZ0JDIn0=
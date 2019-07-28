"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFile = require("../config");
class HelpCommand {
    constructor() {
        this._keyword = "help";
        this._enabled = true;
    }
    help() {
        return "Shows this message";
    }
    runCommand(args, message, bot) {
        if (message.channel.id === ConfigFile.channels.BOT_TESTING ||
            message.channel.id === ConfigFile.channels.FIND_A_SCRIM) {
            message.channel.send({ embed: ConfigFile.infoHelpEmbed });
        }
    }
}
exports.default = HelpCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9oZWxwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esd0NBQXdDO0FBR3hDLE1BQXFCLFdBQVc7SUFBaEM7UUFDYSxhQUFRLEdBQVcsTUFBTSxDQUFDO1FBQ25DLGFBQVEsR0FBWSxJQUFJLENBQUM7SUFhN0IsQ0FBQztJQVhHLElBQUk7UUFDQSxPQUFPLG9CQUFvQixDQUFDO0lBQ2hDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQXdCLEVBQUUsR0FBbUI7UUFFcEUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVc7WUFDdEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDekQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0NBQ0o7QUFmRCw4QkFlQyJ9
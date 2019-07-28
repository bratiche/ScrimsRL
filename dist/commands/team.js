"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TeamCommand {
    constructor() {
        this._keyword = "team";
        this._enabled = true;
    }
    help() {
        return "Manages teams";
    }
    runCommand(args, message, bot) {
        if (args.length < 1)
            return;
        switch (args[0]) {
            case "create":
                this.createTeam(args[1], args[2], args.slice(3));
                break;
            case "edit":
                break;
            case "info":
                break;
            default:
                break;
        }
    }
    createTeam(tag, name, players) {
    }
}
exports.default = TeamCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy90ZWFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEsTUFBcUIsV0FBVztJQUFoQztRQUNhLGFBQVEsR0FBVyxNQUFNLENBQUM7UUFDbkMsYUFBUSxHQUFZLElBQUksQ0FBQztJQWlDN0IsQ0FBQztJQS9CRyxJQUFJO1FBQ0EsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQU9ELFVBQVUsQ0FBQyxJQUFjLEVBQUUsT0FBd0IsRUFBRSxHQUFtQjtRQUVwRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUFFLE9BQU87UUFHNUIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7SUFFTCxDQUFDO0lBRUQsVUFBVSxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsT0FBaUI7SUFFdkQsQ0FBQztDQUNKO0FBbkNELDhCQW1DQyJ9
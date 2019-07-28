"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateCommand {
    constructor() {
        this._keyword = "templateCommand";
        this._enabled = true;
    }
    help() {
        return "This is a test command!";
    }
    runCommand(args, message, bot) {
        message.channel.send("All good!");
    }
}
exports.default = TemplateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3RlbXBsYXRlQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQXFCLGVBQWU7SUFBcEM7UUFDYSxhQUFRLEdBQVcsaUJBQWlCLENBQUM7UUFDOUMsYUFBUSxHQUFZLElBQUksQ0FBQztJQVM3QixDQUFDO0lBUEcsSUFBSTtRQUNBLE9BQU8seUJBQXlCLENBQUM7SUFDckMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFjLEVBQUUsT0FBd0IsRUFBRSxHQUFtQjtRQUNwRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0o7QUFYRCxrQ0FXQyJ9
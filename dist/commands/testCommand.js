"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestCommand {
    constructor() {
        this._keyword = "testCommand";
    }
    help() {
        return "This is a test command!";
    }
    runCommand(args, message, bot) {
        message.channel.send("All good!");
    }
}
exports.default = TestCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvdGVzdENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFxQixXQUFXO0lBQWhDO1FBQ2EsYUFBUSxHQUFXLGFBQWEsQ0FBQztJQVM5QyxDQUFDO0lBUEcsSUFBSTtRQUNBLE9BQU8seUJBQXlCLENBQUM7SUFDckMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFjLEVBQUUsT0FBd0IsRUFBRSxHQUFtQjtRQUNwRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0o7QUFWRCw4QkFVQyJ9
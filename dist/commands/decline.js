"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeclineCommand {
    constructor() {
        this._keyword = "decline";
    }
    help() {
        return "This is a test command!";
    }
    runCommand(args, message, bot) {
        message.channel.send("All good!");
    }
}
exports.default = DeclineCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjbGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9kZWNsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsTUFBcUIsY0FBYztJQUFuQztRQUNhLGFBQVEsR0FBVyxTQUFTLENBQUM7SUFTMUMsQ0FBQztJQVBHLElBQUk7UUFDQSxPQUFPLHlCQUF5QixDQUFDO0lBQ3JDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQXdCLEVBQUUsR0FBbUI7UUFDcEUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNKO0FBVkQsaUNBVUMifQ==
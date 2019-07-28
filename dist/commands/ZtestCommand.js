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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWnRlc3RDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL1p0ZXN0Q29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQXFCLFdBQVc7SUFBaEM7UUFDYSxhQUFRLEdBQVcsYUFBYSxDQUFDO0lBUzlDLENBQUM7SUFQRyxJQUFJO1FBQ0EsT0FBTyx5QkFBeUIsQ0FBQztJQUNyQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxPQUF3QixFQUFFLEdBQW1CO1FBQ3BFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDSjtBQVZELDhCQVVDIn0=
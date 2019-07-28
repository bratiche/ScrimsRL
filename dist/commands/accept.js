"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AcceptCommand {
    constructor() {
        this._keyword = "accept";
    }
    help() {
        return "This is a test command!";
    }
    runCommand(args, message, bot) {
        message.channel.send("All good!");
    }
}
exports.default = AcceptCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXB0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2FjY2VwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLE1BQXFCLGFBQWE7SUFBbEM7UUFDYSxhQUFRLEdBQVcsUUFBUSxDQUFDO0lBU3pDLENBQUM7SUFQRyxJQUFJO1FBQ0EsT0FBTyx5QkFBeUIsQ0FBQztJQUNyQyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWMsRUFBRSxPQUF3QixFQUFFLEdBQW1CO1FBQ3BFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDSjtBQVZELGdDQVVDIn0=
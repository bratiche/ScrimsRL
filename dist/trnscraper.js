"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
class TRNScrapper {
    constructor() {
        this.baseURL = "https://rocketleague.tracker.network/profile/";
    }
    getPlayerMMR(platform, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let mmr = 0;
            let url = this.baseURL + platform + '/' + id;
            yield node_fetch_1.default(url).then(response => {
                return response.text();
            }).then(html => {
                let title = html.split('<title>')[1].split('</title>')[0];
                title = title.trim();
                if (title.length === 0) {
                    console.log('player not found: ' + url);
                    return null;
                }
                else {
                    let playerData = html.split('<script type="text/javascript">')[3].split('</script>')[0];
                    let player3v3StandardRanks = playerData.split("'Ranked Standard 3v3', data: [")[1].split('] },')[0].split(',');
                    let playerMMR = parseInt(player3v3StandardRanks[player3v3StandardRanks.length - 1]);
                    console.log(title + " " + playerMMR);
                    if (playerMMR !== undefined)
                        mmr = playerMMR;
                    return playerMMR;
                }
            }).catch(exception => {
                console.log('Failed to fetch page: ', exception);
            });
            return mmr;
        });
    }
}
exports.default = TRNScrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJuc2NyYXBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90cm5zY3JhcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSwyQ0FBK0I7QUFFL0IsTUFBcUIsV0FBVztJQUFoQztRQUNJLFlBQU8sR0FBRywrQ0FBK0MsQ0FBQztJQXFDOUQsQ0FBQztJQW5DUyxZQUFZLENBQUMsUUFBZ0IsRUFBRSxFQUFVOztZQUMzQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBRzdDLE1BQU0sb0JBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBRTdCLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDWCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFHckIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUMsQ0FBQztvQkFDeEMsT0FBTyxJQUFJLENBQUM7aUJBQ2Y7cUJBQU07b0JBRUgsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEYsSUFBSSxzQkFBc0IsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFHL0csSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVwRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUM7b0JBRXJDLElBQUksU0FBUyxLQUFLLFNBQVM7d0JBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQztvQkFDN0MsT0FBTyxTQUFTLENBQUM7aUJBQ3BCO1lBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO0tBQUE7Q0FDSjtBQXRDRCw4QkFzQ0MifQ==
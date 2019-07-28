import { IMMRFetchMethod } from "./api";
import fetch from "node-fetch";

export default class TRNScrapper implements IMMRFetchMethod {
    baseURL = "https://rocketleague.tracker.network/profile/";

    async getPlayerMMR(platform: string, id: string, tries: number): Promise<number> {
        let mmr = 0;
        let url = this.baseURL + platform + '/' + id;

        if (tries === 0) return 0;

        // Scrap rocketleague.tracker.network because we dont have access to psyonix API :(
        await fetch(url).then(response => {
            // When the page is loaded convert it to text
            return response.text();
        }).then(html => {
            let title = html.split('<title>')[1].split('</title>')[0];
            title = title.trim();

            // Error if there is no title
            if (title.length === 0) {
                console.log(`player not found (${tries-1} tries left): ` + url);
                return null;
            } else {
                // Get player mmr
                let playerData = html.split('<script type="text/javascript">')[3].split('</script>')[0]; // magic
                let player3v3StandardRanks = playerData.split("'Ranked Standard 3v3', data: [")[1].split('] },')[0].split(',');

                // Last value in array is last updated player mmr
                let playerMMR = parseInt(player3v3StandardRanks[player3v3StandardRanks.length - 1]);

                console.log(title + " " + playerMMR);

                if (playerMMR !== undefined) mmr = playerMMR;
                return playerMMR;
            }
        }).catch(exception => {
            console.log('Failed to fetch page: ', exception);
        });

        return mmr === 0 ? this.getPlayerMMR(platform, id, tries - 1) : mmr;
    }
}
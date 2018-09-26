import { create } from "apisauce";
import { from } from "rxjs";
class ItunesService {
    private static api = create({ baseURL: "https://itunes.apple.com" });

    public search(params: object) {
        return from(ItunesService.api.get("/search", params));
    }
}

export const iTunesService = new ItunesService();

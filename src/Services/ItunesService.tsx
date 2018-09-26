import { Observable } from "rxjs";
import { ItunesResponse } from "../Models/ItunesResult";
import { BaseService } from "./BaseService";
class ItunesService extends BaseService {
    public search(params: object): Observable<ItunesResponse> {
        return this.fetch$<ItunesResponse>("/search", params);
    }
}

export const iTunesService = new ItunesService("https://itunes.apple.com");

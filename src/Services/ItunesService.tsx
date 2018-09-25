import axios from 'axios';

class ItunesService {
	public static baseURL = 'https://itunes.apple.com/search';

	public search(params: object) {
		return axios.get(ItunesService.baseURL, { params });
	}
}

export const iTunesService = new ItunesService();

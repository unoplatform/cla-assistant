import {Injectable} from 'angular2/core';
import { Http, Headers } from 'angular2/http';


@Injectable()
export class HomeService {
    private _http: Http;
    constructor(public http: Http) {
        this._http = http;
    }

    public getUser() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let body = JSON.stringify({ obj: 'user', fun: 'get' });
        return this._http.post('/api/v1/github', body, {headers: headers})
            .map(res => {
                return res.json().data;
            });
    }
}

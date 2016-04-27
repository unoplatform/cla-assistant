import {Injectable} from 'angular2/core';
import { Http, Headers } from 'angular2/http';


@Injectable()
export class GithubService {
    constructor(private http: Http) {
    }

    public call(obj: string, fun: string, args: JSON) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        let body = JSON.stringify({ obj: obj, fun: fun, arg: args });
        return this.http.post('/api/v1/github', body, {headers: headers})
            .map(res => {
                return res.json().data;
            }).share();
    }
}

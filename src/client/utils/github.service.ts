import {Injectable, Injector} from 'angular2/core';
import { HTTP_PROVIDERS, Http, Headers } from 'angular2/http';
import 'rxjs/add/operator/publish';
// import 'rxjs/add/operator/refCount';

let injector = Injector.resolveAndCreate([HTTP_PROVIDERS]);

@Injectable()
export class GithubService {
    private http: Http;
    constructor() {
        this.http = injector.get(Http);
    }

    public call(obj: string, fun: string, args: JSON) {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        let body = JSON.stringify({ obj: obj, fun: fun, arg: args });
        return this.http.post('/api/v1/github', body, {headers: headers})
            .map(res => {
                return res.json().data;
            }).publish().refCount();
    }
}

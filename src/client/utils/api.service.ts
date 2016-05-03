import {Injectable, Injector} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import { Http, Headers } from 'angular2/http';
import 'rxjs/add/operator/publish';

let injector = Injector.resolveAndCreate([HTTP_PROVIDERS]);

@Injectable()
export class ApiService {
    private http: Http;
    constructor() {
        this.http = injector.get(Http);
    }

    public post(url: string, body: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        body = JSON.stringify(body);
        return this.http.post('api/v1/' + url, body, { headers: headers })
            .map(res => {
                return res.json().data;
            }).publish().refCount();
    }
}

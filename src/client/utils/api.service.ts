import {Injectable} from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import 'rxjs/add/operator/publish';


@Injectable()
export class ApiService {
    constructor(private http: Http) {
    }

    public post(url:string, body: any) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      body = JSON.stringify(body);
        return this.http.post('api/v1/'+ url, body, {headers: headers})
            .map(res => {
                return res.json().data;
            }).publish().refCount();
    }
}

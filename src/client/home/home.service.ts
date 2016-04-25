import {Injectable, Inject} from 'angular2/core';
import {GithubService} from './../utils/github.service';

@Injectable()
export class HomeService {
    private _githubService: any;
    private _userObservable: any;
    private _user: any;
    constructor( @Inject(GithubService) githubService: GithubService) {
        this._githubService = githubService;
    }

    public getUser(success: Function, error: Function) {
        if (this._user) {
            success(this._user);
        } else {
            this._githubService.call('user', 'get')
                .subscribe(
                    (user) => {
                        this._user = user;
                        success(this._user);
                    },
                    error
            );
        }
        // this._userObservable = this._userObservable || this._githubService.call('user', 'get');
        // return this._userObservable;
    }

    public getUserGists() {
        // this._userObservable.subscribe((user) => this._user = user);
        if (this._user) {
            console.log(this._user);
        }

    }
}

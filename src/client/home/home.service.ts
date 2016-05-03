import {Injectable, Inject} from 'angular2/core';
import {GithubService} from './../utils/github.service';
import {Observable} from 'rxjs/Observable';
// import 'rxjs/Rx';
// import 'rxjs/add/operator/publish';
// import 'rxjs/add/operator/share';

@Injectable()
export class HomeService {
    private _githubService: any;
    private _user$: any;
    private _user: any;
    private _userGists$: any;
    private _userRepos$: any;

    constructor( @Inject(GithubService) githubService: GithubService) {
        this._githubService = githubService;
        this._user$ = this._githubService.call('user', 'get');
    }

    public getUser() {
        let self = this;
        return new Observable((observer) => {
            function returnUser(user) {
                self._user = user;
                observer.next(user);
            }
            function handleError( error ) {
              observer.error(error);
            }
            this._user ? returnUser(this._user) : this._user$.subscribe(returnUser, handleError);
        });
    }

    public getUserGists() {
        let self = this;
        this._userGists$ = this.getUser()
            .flatMap(( user: any ) => {
              return self._githubService.call('gists', 'getFromUser', { user: user.login })
                     .map((gists) => {
                        let transformedGists = [];
                        transformedGists = gists.map( (gist) => {
                            return {
                                name: gist.files[Object.keys(gist.files)[0]].filename || Object.keys(gist.files)[0],
                                url: gist.html_url,
                            };
                        });
                        return transformedGists;
                    });
            });
        return this._userGists$;
    }

    public getUserRepos() {
        let self = this;
        this._userRepos$ = this.getUser()
            .flatMap(( user: any ) => {
              return self._githubService.call( 'repos', 'getFromUser', { user: user.login });
            });
        return this._userRepos$;
    }

}

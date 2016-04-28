
import {it, describe, expect, beforeEach, inject, TestComponentBuilder, injectAsync, beforeEachProviders} from 'angular2/testing';
// import {Http, HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions} from 'angular2/http';
import {provide} from 'angular2/core';
import {GithubService} from '../utils/github.service';
import {HomeService} from './home.service';
import {TestScheduler} from 'rxjs/testing/TestScheduler';
// import {Rx} from 'rxjs/Rx';
// import {MockBackend, MockConnection} from 'angular2/http/testing';
let testScheduler = new TestScheduler((act, exp) => {
            return act === exp;
        });
export function main() {
    describe('HomeService', () => {
        let _githubService;
        let _homeService;

        beforeEachProviders(() => {
            return [
                // HTTP_PROVIDERS,
                // provide(XHRBackend, { useClass: MockBackend }),
                provide(GithubService, { useClass: MockGithubService }),
                HomeService
            ]
        });
        beforeEach(inject([ GithubService, HomeService], ( githubService: GithubService, homeService) => {
            _githubService = githubService;
            _homeService = homeService;
        }));

        it('should get user from github', ( done ) => {
            _homeService.getUser().subscribe((user: any) => {
                expect(user.login).toBe('aaa');
                console.log(user);
                done();
            });
            testScheduler.flush();
        });
    });
}
class MockGithubService {
    constructor() {
        // super(null);
    }
    public call(obj: string, fun: string, args: any) {
        let observable = testScheduler.createHotObservable('--a--b');

        return observable;
    }
}

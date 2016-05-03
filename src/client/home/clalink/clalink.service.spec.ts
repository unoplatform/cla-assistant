
import {provide} from 'angular2/core';
import {ClaLinkService} from './clalink.service';
import {ApiService} from '../../utils/api.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {TestUtil} from '../../uiTest.service';


// impoer Angular2 testing library instead of pure jasmine fuctions
import {it, describe, expect, inject, beforeEachProviders, beforeEach}from 'angular2/testing';

export function main() {
    describe('Test Cla Link Service', () => {

        beforeEachProviders(() => [
            HTTP_PROVIDERS,
            provide(ApiService, { useClass: MockApiService }),
            provide(Window, { useValue: window })
        ]);

        beforeEach(inject([ApiService], (apiService) => {
            this._apiService = apiService;
            this._claLinkService = new ClaLinkService(this._apiService);
            this._testUtil = new TestUtil();
        }));

        it('CLALinkService: it should call our server', done => {
            this._claLinkService.linkRepos(this._testUtil.data.githubRepos).subscribe(() => {
                expect(this._apiService.getCalledUrl()).toBe('repos');
                done();
            });
        });

        it('CLALinkService: it should call our server with new arguments', done => {
            this._claLinkService.linkRepos(this._testUtil.data.githubRepos, this._testUtil.data.gistUrl).subscribe(() => {
                expect(this._apiService.getCalledUrl()).toBe('repos');
                expect(this._apiService.getCalledBody()[0].gist).toBe(this._testUtil.data.gistUrl);
                done();
            });
        });

    });
}


class MockApiService extends ApiService {

    private _mockServiceReturnValue: any;
    private _calledURL: string;
    private _calledBody: string;


    constructor() {
        super(null);
    }

    public post(url: string, body: any) {
        this._calledURL = url;
        this._calledBody = body;

        return Observable.of(this._mockServiceReturnValue);
    }

    public setMockServiceReturnValue(value) {
        this._mockServiceReturnValue = value;
    }

    public getCalledUrl() {
        return this._calledURL;
    }

    public getCalledBody() {
        return this._calledBody;
    }

}

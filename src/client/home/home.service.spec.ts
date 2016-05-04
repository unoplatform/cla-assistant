
import {provide} from 'angular2/core';
import {HomeService} from '../home/home.service';
import {GithubService} from '../utils/github.service';
import {TestUtil} from '../uiTest.service';
import * as Sinon from 'sinon';
import {it, describe, expect, inject, beforeEachProviders, beforeEach}from 'angular2/testing';

export function main() {
    describe('Service test suite', () => {
        let testUtil: TestUtil;
        let mockUser;

        beforeEachProviders(() => [
            GithubService,
            provide(Window, { useValue: window })
        ]);

        beforeEach(inject([GithubService], (githubService) => {
            testUtil = new TestUtil();

            mockUser = {
                login: 'testUser',
            };

            Sinon.stub(githubService, 'call', (obj, func, args) => {
                if (obj === 'user' && func === 'get') {
                    return testUtil.getObservable(mockUser);
                } else if (obj === 'gists' && func === 'getFromUser') {
                    return testUtil.getObservable(testUtil.data.mockGists);
                } else if (obj === 'repos' && func === 'getFromUser') {
                    return testUtil.getObservable(testUtil.data.githubRepos);
                }
            });

            this._githubService = githubService;
            this._homeService = new HomeService(this._githubService);
        }));

        it('HomeService: it should get the mock user', done => {
            this._homeService.getUser().subscribe((user) => {
                console.log(user);
                done();
                expect(user.login).toBe('testUser');
            });
        });

        describe('transforming gists', () => {
            let mockGists;
            let expectedGists;
            beforeEach(() => {
                expectedGists = [
                    {
                        name: 'keyvalue1',
                        url: 'http://gist1'
                    }, {
                        name: 'keyvalue2',
                        url: 'http://gist2'
                    }
                ];

            });
            it('HomeService: it should transform user gists ', done => {
                this._homeService.getUserGists().subscribe((gists) => {
                    expect(gists).toEqual(expectedGists);
                    expect(this._githubService.call.calledWith({obj: 'gists', fun: 'getFromUser', args: mockUser}));
                    done();
                });
            });
            it('HomeService: it should get the right name of the user gists ', done => {
                testUtil.data.mockGists[0].files = {
                    key1: {
                        filename: undefined
                    }
                };

                expectedGists[0].name = 'key1';

                this._homeService.getUserGists().subscribe((gists) => {
                    expect(gists).toEqual(expectedGists);
                    done();
                });
            });

        });

        describe('Repos', () => {
            it('HomeService: it should return repositories for the user ', done => {

                this._homeService.getUserRepos().subscribe((repos) => {
                    expect(repos).toEqual(testUtil.data.githubRepos);
                    expect(this._githubService.call.calledWith({obj: 'repos', fun: 'getFromUser', args: mockUser}));
                    done();
                });
            });


        });
    });
}

import {provide} from 'angular2/core';
import {HomeService} from '../home/home.service';
import {GithubService} from '../utils/github.service';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';


// impoer Angular2 testing library instead of pure jasmine fuctions
import {it, describe, expect, inject, beforeEachProviders, beforeEach}from 'angular2/testing';

export function main() {
    describe('Service test suite', () => {
     let _githubService: GithubService;
     let _homeService: HomeService;

     beforeEachProviders( () => [
            HTTP_PROVIDERS,
            HomeService,
            provide(GithubService, {useClass: mockGithubService}),
            provide(Window, { useValue: window })
      ]);

      beforeEach(inject([GithubService], (githubService) => {
          this._githubService = githubService;
          let mockUser = {
            login : 'testUser',
          };

          this._githubService.setMockServiceReturnValue(mockUser);

          this._homeService = new HomeService(this._githubService);
      }));

      it('GithubService: should get the mock user', done => {
              let mockUser = JSON.parse('{}');

              this._githubService.call( 'a', 'b', mockUser).subscribe( (user) => {
                expect( user.login ).toBe( 'testUser' );
                done();
              });
        });


      it('HomeService: it should get the mock user', done => {

            this._homeService.getUser().subscribe((user) => {
              console.log(user);
              expect(user.login).toBe('testUser');
              done();
            });

        });

      describe('transforming gists', () => {
            let mockGists;
            let expectedGists;
            beforeEach(() => {
              mockGists = [
                {
                  files: {
                    key1: {
                      filename: 'keyvalue1'
                    }
                  },
                  html_url : 'http://gist1'
                },
                {
                  files: {
                    key2: {
                      filename: 'keyvalue2'
                    }
                  },
                  html_url : 'http://gist2'
                },
              ];

              expectedGists = [
                {
                  name : 'keyvalue1',
                  url  : 'http://gist1'
                }, {
                  name : 'keyvalue2',
                  url  : 'http://gist2'
                }
              ];

            });
            it('HomeService: it should transform user gists ', done => {
                let expectedArgs = {
                  user : 'testUser'
                };
                console.log(mockGists);

                this._githubService.setMockServiceReturnValue(mockGists);

                this._homeService.getUserGists().subscribe((gists) => {
                  expect(gists).toEqual(expectedGists);
                  expect(this._githubService.getCalledObj()).toBe('gists');
                  expect(this._githubService.getCalledFun()).toBe('getFromUser');
                  expect(this._githubService.getCalledArgs()).toEqual(expectedArgs);
                  done();
                });
            });
            it('HomeService: it should get the right name of the user gists ', done => {
                mockGists[0].files = {
                      key1: {
                        filename: undefined
                      }
                    };

                expectedGists[0].name = 'key1';

                this._githubService.setMockServiceReturnValue(mockGists);

                this._homeService.getUserGists().subscribe((gists) => {
                  expect(gists).toEqual(expectedGists);
                  done();
                });
            });

        });


    });
}


class mockGithubService extends GithubService {

private _mockServiceReturnValue: any;
private _calledObj: string;
private _calledFun: string;
private _calledArgs: JSON;


  constructor() {
    super(null);
  }

  public call(obj: string, fun: string, args: JSON) {
    this._calledObj = obj;
    this._calledFun = fun;
    this._calledArgs = args;

    return Observable.of(this._mockServiceReturnValue);
  }

  public setMockServiceReturnValue(value) {
    this._mockServiceReturnValue = value;
  }

  public getCalledObj() {
    return this._calledObj;
  }

  public getCalledArgs() {
    return this._calledArgs;
  }

  public getCalledFun() {
    return this._calledFun;
  }

}

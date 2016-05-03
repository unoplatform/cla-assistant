import {HTTP_PROVIDERS} from 'angular2/http';
import {Component, provide, Input} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {HomeService} from '../home/home.service';
import {GithubService} from '../utils/github.service';
import {Observable} from 'rxjs/Observable';
import {HomeComponent} from '../home/home.component';

import 'rxjs/Rx';

// impoer Angular2 testing library instead of pure jasmine fuctions
import {it, describe, expect, TestComponentBuilder, injectAsync, beforeEachProviders} from 'angular2/testing';

export function main() {
    describe('A suite', () => {
        beforeEachProviders(() => [
            HTTP_PROVIDERS,
            provide(GithubService, { useClass: MockGithubService }),
            provide(HomeService, { useClass: MockHomeService }),
            GithubService,
            provide(Window, { useValue: window })
        ]);

        it('should greet the logged in user', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
                return tcb.createAsync(TestComponent)
                    .then(rootTC => {
                        rootTC.detectChanges();
                        let appDOMEl = rootTC.debugElement.nativeElement;
                        let text = (DOM.querySelector(appDOMEl, '.navbar-text-hide').textContent).trim();
                        expect(text).toEqual('Hey, UserName!');
                    });
            }));
    });
}

@Component({
    directives: [HomeComponent],
    selector: 'test-cmp',
    template: '<home [user]="user"></home>'
})
class TestComponent {
    @Input() public user: any;

    constructor() {
        this.user = {
            avtar_url: 'http://avtarurl.com',
            html_url: 'http://htmlurl.com',
            login: 'UserName'
        };
    };


}

class MockGithubService extends GithubService {

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


class MockHomeService extends HomeService {

  constructor() {
    super(new MockGithubService());
  }

    public getUser() {
      return Observable.of({});
    }

    public getUserGists() {
      return Observable.of([]);
    }

}

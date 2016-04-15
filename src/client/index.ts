
import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, provide, ViewResolver, ViewMetadata, Type} from 'angular2/core';
import {LoginComponent}     from './login/login.component';
import {HomeComponent} from './home/home.component';
import {Http, Headers, HTTP_PROVIDERS, Response} from 'angular2/http';
import {enableProdMode} from 'angular2/core';

import 'rxjs/Rx';

enableProdMode();

@Component({
    directives: [LoginComponent, HomeComponent],
    selector: 'mainroot',
    template: `<login *ngIf="login"></login>
               <home  *ngIf="home"></home>`,
    viewProviders: [HTTP_PROVIDERS],
})

class RootComponent {
    @Input() public authenticated: boolean;
    @Input() public login: boolean;
    @Input() public home: boolean;

    constructor(public http: Http) {
      let that = this;
        http.get('/isUserAuthenticated')
            .map(res => <boolean>res.json())
            .subscribe(
            function(data) {
                if (data) {
                    that.login = false;
                    that.home = true;
                } else {
                    that.login = true;
                    that.home = false;
                }
            }
            );
    }
}

bootstrap(RootComponent, [provide(Window, { useValue: window })]);

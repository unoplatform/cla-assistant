
import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input, provide } from 'angular2/core';
import {LoginComponent}     from './login/login.component';
import {HomeComponent} from './home/home.component';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {enableProdMode} from 'angular2/core';
import {NgIf} from 'angular2/common';

import 'rxjs/Rx';

enableProdMode();

@Component({
    directives: [LoginComponent, HomeComponent, NgIf],
    selector: 'mainroot',
    template: `<login *ngIf="login"></login>
               <home  *ngIf="home" [user]="user"></home>`,
    viewProviders: [HTTP_PROVIDERS]
})

export class RootComponent {
    // parameters that control visibility of home and the login component
    @Input() public login: boolean;
    @Input() public home: boolean;

    @Input() public user: JSON;

    constructor(private http: Http) {
        let that = this;
        http.get('/api/github/user')
            .map(res => res.json().data)
            .subscribe(
            function(user) {
                that.user = user;
                that.login = false;
                that.home = true;
            },
            function(error) {
                that.login = true;
                that.home = false;
            }
        );
    }
}

bootstrap(RootComponent, [provide(Window, { useValue: window })]);


import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input} from 'angular2/core';
import {LoginComponent}     from './login/login.component';
import {HomeComponent} from './home/home.component';


@Component({
    directives: [LoginComponent, HomeComponent],
    selector: 'mainroot',
    template: `<login *ngIf="!authenticated"></login>
               <home  *ngIf="authenticated"></home>`,
})

class RootComponent {
    @Input() public authenticated: boolean;

    constructor() {
        this.authenticated = this._isAuthenticated();
    }

    private _isAuthenticated() {
        return false;
    }

}

bootstrap(RootComponent);

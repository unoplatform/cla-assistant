
import {bootstrap}    from 'angular2/platform/browser';
import {Component, Input,provide} from 'angular2/core';
import {LoginComponent}     from './login/login.component';
import {HomeComponent} from './home/home.component';

import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

@Component({
    selector: 'mainroot',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]

})

@RouteConfig([
    { path: '/', component: LoginComponent, as: 'Login' },
    { path: '/home', component: HomeComponent, as: 'Home' }
])

class RootComponent { }

bootstrap(RootComponent, [ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);

// bootstrap(LoginComponent);

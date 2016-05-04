import {bootstrap}    from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
// import {HomeService} from './home/home.service';
import {RootComponent} from './index';

import 'rxjs/Rx';

enableProdMode();

bootstrap(RootComponent, [ provide(Window, { useValue: window })]);

import {bootstrap}    from 'angular2/platform/browser';
import {enableProdMode, provide} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {RootComponent} from './index';

import 'rxjs/Rx';

enableProdMode();

bootstrap(RootComponent, [HTTP_PROVIDERS, provide(Window, { useValue: window })]);

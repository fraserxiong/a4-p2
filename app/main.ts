import {bootstrap} from 'angular2/platform/browser';
import {AppRouterComponent} from './app-router.component';
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(AppRouterComponent, [HTTP_PROVIDERS]);

import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { AppHomeComponent} from './home/app-home.component';
import {AdminMainComponent} from './admin/admin-main.component';

@Component(
{
	selector: "main-app",
	template: '<router-outlet></router-outlet>',
	providers: [ROUTER_PROVIDERS],
	directives: [ROUTER_DIRECTIVES]
})

@RouteConfig(
	[
		{
			path: '/home',
			name: 'Home',
			component: AppHomeComponent,
			useAsDefault: true
		},
		{
			path: '/admin',
			name: 'Admin',
			component: AdminMainComponent
		}
	]
)

export class AppRouterComponent{

}


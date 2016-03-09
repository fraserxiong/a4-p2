import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {AdminAuthenticationService} from './admin-authentication.service';
import {AdminLoginComponent} from './admin-login.component';
import {AdminManageComponent} from './admin-manage.component';

@Component(
{
	selector: 'admin-main',
	templateUrl: 'app/admin/admin-main.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [AdminAuthenticationService]
})

@RouteConfig([
	{
		path: "/login",
		name: "AdminLogin",
		component: AdminLoginComponent,
		useAsDefault: true
	},
	{
		path: "/manage",
		name: "AdminManage",
		component: AdminManageComponent,
	}
])

export class AdminMainComponent{
}
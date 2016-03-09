import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {AdminAuthenticationService} from './admin-authentication.service';
import {AuthenticationService} from '../user/authentication.service';
import {UserLoginComponent} from '../user/user-login.component';
import {AdminManageComponent} from './admin-manage.component';

@Component(
{
	selector: 'admin-main',
	templateUrl: 'app/admin/admin-main.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [AuthenticationService]
})

@RouteConfig([
	{
		path: "/login",
		name: "AdminLogin",
		component: UserLoginComponent,
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
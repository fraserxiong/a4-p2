import { Component, provide, OnInit, ViewChild, HostListener }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import { AdminAuthenticationService } from './admin-authentication.service';
import { AdminLoginComponent } from './admin-login.component';
import { AdminManageComponent } from './admin-manage.component';
import { Authenticator } from '../authentication/authentication.service';
import { AdminUsersService } from './admin-users.service';


@Component(
{
	selector: 'admin-main',
	templateUrl: 'app/admin/admin-main.component.html',
	directives: [ROUTER_DIRECTIVES],
	providers: [provide(Authenticator, { useClass: AdminAuthenticationService }), AdminUsersService]
})

@RouteConfig([
	{
		path: "/login",
		name: "AdminLogin",
		component: AdminLoginComponent,
	},
	{
		path: "/manage",
		name: "AdminManage",
		component: AdminManageComponent,
		useAsDefault: true
	}
])

export class AdminMainComponent{}
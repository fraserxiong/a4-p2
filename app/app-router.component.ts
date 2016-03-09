import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { AppHomeComponent} from './home/app-home.component';
import { AdminMainComponent} from './admin/admin-main.component';
import { SearchComponent} from './search/search-display.component';
import { UserProfileComponent} from './user/user-profile.component';
import { UserLoginComponent} from './user/user-login.component';
import { UserAuthenticationService} from "./user/user-authentication.service";
import { user_db, user} from './user/user.service';

@Component(
{
	selector: "main-app",
	template: '<router-outlet></router-outlet>',
	providers: [ROUTER_PROVIDERS, UserAuthenticationService, user_db],
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
			path: '/login',
			name: 'UserLogin',
			component: UserLoginComponent
		},
		{
			path: '/signup',
			name: 'UserSignup',
			component: UserLoginComponent
		},
		{
			path: '/admin/...',
			name: 'Admin',
			component: AdminMainComponent
		},
		{
			path: '/search/:query',
			name: 'Search',
			component: SearchComponent,
		},
		{
			path: '/user/:id',
			name: 'UserProfile',
			component: UserProfileComponent,
		},
	]
)

export class AppRouterComponent{

}

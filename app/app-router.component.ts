import { Component, provide, HostListener, ViewChild, OnInit }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import { AppHomeComponent} from './home/app-home.component';
import { AdminMainComponent} from './admin/admin-main.component';
import { SearchComponent} from './search/search-display.component';
import { DetailsComponent} from './details/details.component';
import { UserProfileComponent} from './user/user-profile.component';
import { UserLoginComponent} from './user/user-login.component';
import { UserAuthenticationService} from "./user/user-authentication.service";
import { UserProfileService } from './user/user-profile.service';
import { AppFooterComponent } from './footer/app-footer.component';
import { AppHeaderComponent} from './header/app-header.component';
import { LoginComponent } from './login/login.component';
import { Authenticator } from './authentication/authentication.service';
import { AppOfferService } from './app-offer.service';
import { CommentService } from './comment/comment.service';
import { User } from './model/user';

@Component(
{
	selector: "main-app",
	templateUrl: "app/app-router.component.html",
	styleUrls: ['app/app-router.component.css'],
	providers: [ROUTER_PROVIDERS, provide(Authenticator, { useClass: UserAuthenticationService}), UserProfileService, AppOfferService, CommentService],
	directives: [ROUTER_DIRECTIVES, AppHeaderComponent, AppFooterComponent]
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
			path: '/details/:id',
			name: 'Details',
			component: DetailsComponent,
		},
		{
			path: '/user/:id',
			name: 'UserProfile',
			component: UserProfileComponent,
		},
	]
)

export class AppRouterComponent{

	constructor(private _authenticator: Authenticator) { }

	getCurUser() : User{
		return this._authenticator.curUser;
	}

}

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
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { Authenticator } from './authentication/authentication.service';
import { AppOfferService } from './app-offer.service';
import { CommentService } from './comment/comment.service';
import { User } from './model/user';
import { NgClass } from 'angular2/common';
import { OpacityAnimator } from './animation/opacity.animation';
import { RightShiftAnimator } from './animation/right-shift.animation';
import { OrderSidebarComponent } from './order/order-sidebar.component';
import { OrderService } from './order/order.service';

@Component(
{
	selector: "main-app",
	templateUrl: "app/app-router.component.html",
	styleUrls: ['app/app-router.component.css'],
	providers: [ROUTER_PROVIDERS, provide(Authenticator, { useClass: UserAuthenticationService}), UserProfileService, AppOfferService, CommentService, OrderService],
	directives: [ROUTER_DIRECTIVES, AppHeaderComponent, AppFooterComponent, NgClass, OpacityAnimator, RightShiftAnimator, OrderSidebarComponent]
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
			component: SignupComponent
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

	private isCartOpen: boolean = false;

	getCurUser() : User{
		return this._authenticator.curUser;
	}

	private toggleCart(toggle: boolean){
		this.isCartOpen = toggle;
	}

}

import { Component, OnInit, Input}       from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES }       from 'angular2/router';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserMyDishComponent } from './user-my-dish.component';
import { UserSidebarComponent } from './user-sidebar.component';

@Component(
{
	selector: 'user',
	templateUrl: "app/user/user-profile.component.html",
  	styleUrls: ['app/user/user-profile.component.css'],
  	directives: [ROUTER_DIRECTIVES, UserAvatarComponent, UserSidebarComponent]
})

export class UserProfileComponent implements OnInit{
	@Input('user') curUser: User;

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams){}

	ngOnInit(){
		
	}
}

import { Component, OnInit}       from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES }       from 'angular2/router';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserMyDishComponent } from './user-my-dish.component';
import { UserProfileComponent } from './user-profile.component';
import { UserMyFriendComponent } from './user-my-friend.component';
import { DishUploadComponent } from '../dish/dish-upload.component';

@Component(
{
	selector: 'user-sidebar',
	templateUrl: "app/user/user-sidebar.component.html",
  	styleUrls: ['app/user/user-sidebar.component.css'],
  	directives: [ROUTER_DIRECTIVES]
})

export class UserSidebarComponent implements OnInit{
	private curUser: User;
	private curId: number;

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams){}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');
		this._profileService.findUserById(id)
			.then(user => {
				this.curUser = user;
				this.curId = user.id;
			});

	}
}

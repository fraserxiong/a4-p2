import { Component, OnInit}       from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES }       from 'angular2/router';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';

@Component(
{
	selector: 'user',
	templateUrl: "app/user/user-profile.component.html",
  	styleUrls: ['app/user/user-profile.component.css'],
  	directives: [ROUTER_DIRECTIVES, UserAvatarComponent]
})

export class UserProfileComponent implements OnInit{
	private curUser: User;
	private friends: User[] = [];

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams){}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');
		this._profileService.findUserById(id)
			.then(user => {
				this.curUser = user;
			})
			.then(() => {
				if (this.curUser.friends) { 
					for (var i: number = 0; i < this.curUser.friends.length; i++) {
						this._profileService.findUserById(this.curUser.friends[i])
							.then(friend => this.friends.push(friend));
					}
				}
			});
	}
}

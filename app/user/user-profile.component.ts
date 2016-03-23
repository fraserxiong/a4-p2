import { Component, OnInit}       from 'angular2/core';
import { RouteParams }       from 'angular2/router';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service'

@Component(
{
	selector: 'user',
	templateUrl: "app/user/user-profile.component.html",
  	styleUrls: ['app/user/user-profile.component.css'],
})

export class UserProfileComponent implements OnInit{
	private curUser: User;
	user_list: User[];

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams){}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');
		this.curUser = this._profileService.findUserById(id);
	}
}

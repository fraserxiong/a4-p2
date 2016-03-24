import { Component, OnInit}       from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES }       from 'angular2/router';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';

@Component(
{
	selector: 'user',
	templateUrl: "app/user/user-profile.component.html",
  	styleUrls: ['app/user/user-profile.component.css'],
  	directives: [ROUTER_DIRECTIVES]
})

export class UserProfileComponent implements OnInit{
	private curUser: User;
	private user_list: User[] = [];

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams){}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');
		this._profileService.findUserById(id).then(user => this.curUser = user);
	}
}

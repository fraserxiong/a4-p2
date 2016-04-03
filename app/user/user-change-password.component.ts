import { Component, OnInit, Input, Output,EventEmitter}       from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES }       from 'angular2/router';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserMyDishComponent } from './user-my-dish.component';
import { UserSidebarComponent } from './user-sidebar.component';
import { State } from './user-main.state';
import { ChangePasswordService } from './user-change-password.service';

@Component(
{
	selector: 'user-change-password',
	templateUrl: "app/user/user-change-password.component.html",
  	styleUrls: ['app/user/user-change-password.component.css'],
  	directives: [ROUTER_DIRECTIVES, UserAvatarComponent, UserSidebarComponent],
  	providers: [ChangePasswordService]
})

export class ChangePasswordComponent{
	@Input('user') curUser: User;
	@Output('stateSelected') stateEmitter= new EventEmitter<State>();
	private stateEnum = State;

	private selectstate(state:State){
		this.stateEmitter.emit(state);
	}

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams,
		private _changepasswordService: ChangePasswordService){}


	onChange(newpassword:string, confirm:string){
		// let user: User = {
		// 	name: name,
		// 	email: email,
		// 	phone_number: phonenum,
		// 	address: address,
		// 	postcode: postcode,
		// 	avatar_url: url
		// };

		// this._changepasswordService.updateuser(user)
		// 	.subscribe
		// 	(successMessage => console.log('Success: ' + successMessage),
		// 	 error => console.log('Error: ' + error));
		// this.selectstate(this.stateEnum.Profile);
	}

	ngOnInit(){
		
	}
}
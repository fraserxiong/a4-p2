import { Component, OnInit, Input, Output,EventEmitter}       from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES }       from 'angular2/router';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserMyDishComponent } from './user-my-dish.component';
import { UserSidebarComponent } from './user-sidebar.component';
import { State } from './user-main.state';
import { ProfileEditService } from './user-edit.service';

@Component(
{
	selector: 'user-edit',
	templateUrl: "app/user/user-edit.component.html",
  	styleUrls: ['app/user/user-edit.component.css'],
  	directives: [ROUTER_DIRECTIVES, UserAvatarComponent, UserSidebarComponent],
  	providers: [ProfileEditService]
})

export class UserEditComponent{
	@Input('user') curUser: User;
	@Output('stateSelected') stateEmitter= new EventEmitter<State>();
	private stateEnum = State;

	private selectstate(state:State){
		this.stateEmitter.emit(state);
	}

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams,
		private _profileEditService: ProfileEditService){}


	onUpdate(name:string, email:string, phonenum:string, address:string, postcode:string, url:string){
		let user: User = {
			name: name,
			email: email,
			phone_number: phonenum,
			address: address,
			postcode: postcode,
			avatar_url: url
		};

		this._profileEditService.updateuser(user)
			.subscribe
			(successMessage => console.log('Success: ' + successMessage),
			 error => console.log('Error: ' + error));
		this.selectstate(this.stateEnum.Profile);
	}

	ngOnInit(){
		
	}
}
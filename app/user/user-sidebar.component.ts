import { Component, OnInit, Output, EventEmitter}       from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES }       from 'angular2/router';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserMyDishComponent } from './user-my-dish.component';
import { UserProfileComponent } from './user-profile.component';
import { UserMyFriendComponent } from './user-my-friend.component';
import { DishUploadComponent } from '../dish/dish-upload.component';
import { State } from './user-main.state';

@Component(
{
	selector: 'user-sidebar',
	templateUrl: "app/user/user-sidebar.component.html",
  	styleUrls: ['app/user/user-sidebar.component.css'],
  	directives: [ROUTER_DIRECTIVES]
})

export class UserSidebarComponent{
	@Output('stateSelected') stateEmitter= new EventEmitter<State>();
	private stateEnum = State;

	private selectstate(state:State){
		this.stateEmitter.emit(state);
	}
}

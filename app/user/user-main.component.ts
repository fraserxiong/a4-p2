import { Component, provide, OnInit}       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import { UserProfileComponent } from './user-profile.component';
import { UserMyDishComponent } from './user-my-dish.component';
import { UserMyFriendComponent } from './user-my-friend.component';
import { AddFriendComponent } from './user-add-friend.component';
import {UserSidebarComponent } from './user-sidebar.component';
import { DishUploadComponent} from '../dish/dish-upload.component';
import { UserMyOrderComponent } from './user-my-order.component';
import { FriendMessageComponent } from './user-friend-message.component';
import { UserEditComponent } from './user-edit.component';
import { ChangePasswordComponent } from './user-change-password.component';
import {User } from '../model/user';
import { UserMainService} from './user-main.service';
import { State } from './user-main.state';

@Component(
{
	selector: 'user-main',
	templateUrl: 'app/user/user-main.component.html',
	styleUrls: ['app/user/user-main.component.css'],
	directives: [ROUTER_DIRECTIVES, UserSidebarComponent, UserProfileComponent, UserMyDishComponent,UserMyFriendComponent, DishUploadComponent,UserMyOrderComponent, UserEditComponent,ChangePasswordComponent, AddFriendComponent,FriendMessageComponent]
})

export class UserMainComponent implements OnInit{
	private user : User;
	private stateEnum=State;
	private state: State;

	constructor(private _sessionuserService: UserMainService){}
	ngOnInit(){
		this.updateUser();
	}

	selectState(state: State){
		this.state = state;
		this.updateUser();
	}

	updateUser(){
		this._sessionuserService.user.subscribe(
			(response: User) => this.user=response,
			error => console.log(error)
			);
	}

}
import { Component, provide, OnInit}       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';
import { UserProfileComponent } from './user-profile.component';
import { UserMyDishComponent } from './user-my-dish.component';
import { UserMyFriendComponent } from './user-my-friend.component';
import {UserSidebarComponent } from './user-sidebar.component';
import { DishUploadComponent} from '../dish/dish-upload.component'
import {User } from '../model/user';
import { UserMainService} from './user-main.service';
import { State } from './user-main.state';

@Component(
{
	selector: 'user-main',
	templateUrl: 'app/user/user-main.component.html',
	styleUrls: ['app/user/user-main.component.css'],
	directives: [ROUTER_DIRECTIVES, UserSidebarComponent, UserProfileComponent, UserMyDishComponent,UserMyFriendComponent, DishUploadComponent]
})

export class UserMainComponent implements OnInit{
	private user : User;
	private stateEnum=State;

	constructor(private _sessionuserService: UserMainService){}
	ngOnInit(){
		//meiyou xie
		this._sessionuserService.user.subscribe(
			(response: User) => this.user=response,
			error => console.log(error)
			);
	}

}
import {Component, Input, OnInit} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "../dish/dish-overview.component";
import {UserProfileComponent} from "./user-profile.component";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserSidebarComponent } from './user-sidebar.component';
import { UserFriendService } from './user-my-friend.service';

@Component({
	selector: 'user-my-friend',
	templateUrl: 'app/user/user-my-friend.component.html',
	styleUrls: ['app/user/user-my-friend.component.css'],
	directives: [ROUTER_DIRECTIVES, UserProfileComponent,UserAvatarComponent,UserSidebarComponent ],
	providers:[UserFriendService]
})
export class UserMyFriendComponent implements OnInit{
	@Input('user') curUser: User;
	private curId: number;
	private friends: User[] = [];

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams,
		private _FriendService:UserFriendService){}

	ngOnInit(){
		this._FriendService.friend.subscribe(
			(res: User[])=>this.friends=res,
			error => console.log(error)
			)
	}

}
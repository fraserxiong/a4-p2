import {Component, Input, OnInit} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "../dish/dish-overview.component";
import {UserProfileComponent} from "./user-profile.component";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserSidebarComponent } from './user-sidebar.component';
import { AddFriendService } from './user-add-friend.service';

interface FriendRequest{
	friend: User;
	success: boolean;
	submitted: boolean;
}

@Component({
	selector: 'user-add-friend',
	templateUrl: 'app/user/user-add-friend.component.html',
	styleUrls: ['app/user/user-add-friend.component.css'],
	directives: [ROUTER_DIRECTIVES, UserProfileComponent,UserAvatarComponent,UserSidebarComponent ],
	providers:[AddFriendService]
})
export class AddFriendComponent{
	@Input('user') curUser: User;
	private curId: number;
	private results: FriendRequest[] = [];

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams,
		private _FriendService:AddFriendService){}

	search(keyword){
		this._FriendService.friend_search(keyword).subscribe(
			(response: User[]) => {
				response.forEach((user: User)=>{
					this.results.push({
						friend: user,
						success : false,
						submitted : false,
					});
				});
			},
			error => console.log(error)
			);
	}

	add(id){
		this._FriendService.addfriend(id).subscribe(
			(response: string) => {window.alert('Success!')},
			error => window.alert('Fail!')
			)
	}

}
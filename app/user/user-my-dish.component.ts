import {Component, Input, OnInit} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "../dish/dish-overview.component";
import {UserProfileComponent} from "./user-profile.component";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserSidebarComponent } from './user-sidebar.component';

@Component({
	selector: 'user-my-dish',
	templateUrl: 'app/user/user-my-dish.component.html',
	styleUrls: ['app/user/user-my-dish.component.css'],
	directives: [ROUTER_DIRECTIVES, UserProfileComponent,UserSidebarComponent],
})
export class UserMyDishComponent{
	@Input('dishes') dishes: Dish[];
	private curUser: User;
	private curId: number;

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams){}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');
		this._profileService.findUserById(id)
			.then(user => {
				this.curUser = user;
				this.curId = user.id;
			});

	}
}
import {Component, Input, OnInit} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "../dish/dish-overview.component";
import {UserProfileComponent} from "./user-profile.component";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserSidebarComponent } from './user-sidebar.component';
import { UserMainService} from './user-main.service';

@Component({
	selector: 'user-my-dish',
	templateUrl: 'app/user/user-my-dish.component.html',
	styleUrls: ['app/user/user-my-dish.component.css'],
	directives: [ROUTER_DIRECTIVES, DishOverviewComponent, UserProfileComponent,UserSidebarComponent],
})
export class UserMyDishComponent{
	private dishes: Dish[] = [];
	private curUser: User;
	private curId: number;
	private deletable = true;

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams,
		private _userMainService: UserMainService
	){}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');
		this._profileService.findUserById(id)
			.then(user => {
				this.curUser = user;
				this.curId = user.id;
			});

		this._userMainService.get_posts_by_user()
			.then(dishes => this.dishes = dishes);

	}

	onDelete(){
		var scope = this;
		return function(id: String){
			scope._userMainService.delete_post(id)
				.then(dishes => scope.dishes = dishes);
		}

	}
}

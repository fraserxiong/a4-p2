import { Component, OnInit, HostListener}       from 'angular2/core';
import { AppOfferService } from '../app-offer.service';
import { UserProfileService } from '../user/user-profile.service';
import { UserMainService} from '../user/user-main.service';
import { User } from '../model/user';
import { Router, OnActivate, ComponentInstruction } from 'angular2/router';
import { Authenticator } from '../authentication/authentication.service';
import { Dish } from '../model/dish';
import { UserAvatarComponent } from '../user/user-avatar.component';
import { DishListComponent } from '../dish/dish-list.component';
import { State } from './admin-dashboard.state';
import { AdminSidebarComponent } from './admin-sidebar.component';
import {DishOverviewComponent} from "../dish/dish-overview.component";

@Component({
	selector: 'admin-manage',
	templateUrl: 'app/admin/admin-manage.component.html',
	styleUrls:['app/admin/admin-manage.component.css'],
	directives: [DishOverviewComponent, UserAvatarComponent, DishListComponent, AdminSidebarComponent]
})

export class AdminManageComponent implements OnInit, OnActivate{
	private dishes: Dish[] = [];
	private users: User[] = [];

	private stateEnum = State;
	private state: State;
	private deletable = true;

	constructor(
		private _offerService: AppOfferService,
		private _userProfileSerivce: UserProfileService,
		private _router: Router,
		private _authenticator: Authenticator,
		private _userMainService: UserMainService
	){}

	ngOnInit(){
		this._offerService.search_by_query('abc')
			.then(results => this.dishes = results);
		this.users = this._userProfileSerivce.allUsers;
		this._userMainService.get_all_post_for_admin()
							 .then(dishes => this.dishes = dishes);
		this.state = this.stateEnum.Users;
	}

	gotoState(state: State): void{
		this.state = state;
	}

	onDelete(){
		var scope = this;
		return function(id: String){
			scope._userMainService.admin_delete_post(id)
				.then(dishes => scope.dishes = dishes);
		}
	}

	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction){
		// if(!this._authenticator.signedIn || !this._authenticator.curUser.isAdmin){
		// 	console.log(this._authenticator.curUser);
		// 	this._router.navigate(['AdminLogin']);
		// }
	}
}

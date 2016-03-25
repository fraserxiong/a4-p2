import { Component, OnInit}       from 'angular2/core';
import { AppOfferService } from '../app-offer.service';
import { UserProfileService } from '../user/user-profile.service';
import { User } from '../model/user';
import { Router, OnActivate, ComponentInstruction } from 'angular2/router';
import { Authenticator } from '../authentication/authentication.service';
import { Dish } from '../model/dish';
import { UserAvatarComponent } from '../user/user-avatar.component';
import { DishListComponent } from '../dish/dish-list.component';

enum State{
	User,
	Food
}

@Component({
	selector: 'admin-manage',
	templateUrl: 'app/admin/admin-manage.component.html',
	styleUrls:['app/admin/admin-manage.component.css'],
	directives: [UserAvatarComponent, DishListComponent]
})

export class AdminManageComponent implements OnInit, OnActivate{
	private dishes: Dish[] = [];
	private users: User[] = [];

	stateEnum = State;
	state: State;

	constructor(
		private _offerService: AppOfferService,
		private _userProfileSerivce: UserProfileService,
		private _router: Router,
		private _authenticator: Authenticator
	){}

	ngOnInit(){
		this._offerService.search_by_query('abc')
			.then(results => this.dishes = results);
		this.users = this._userProfileSerivce.allUsers;
	}

	gotoState(state: State): void{
		this.state = state;
	}

	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction){
		if(!this._authenticator.signedIn || !this._authenticator.curUser.isAdmin){
			console.log(this._authenticator.curUser);
			this._router.navigate(['AdminLogin']);
		}
	}
}

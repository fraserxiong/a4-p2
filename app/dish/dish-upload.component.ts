import {Component, Input, OnInit} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "./dish-overview.component";
import {UserProfileComponent} from "../user/user-profile.component";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from '../user/user-profile.service';
import { UserAvatarComponent } from '../user/user-avatar.component';

@Component({
	selector: 'dish-upload',
	templateUrl: 'app/dish/dish-upload.component.html',
	styleUrls: ['app/dish/dish-upload.component.css'],
	directives: [ROUTER_DIRECTIVES,DishOverviewComponent]
})
export class DishUploadComponent{
	private nameHint: string = "Dish Name";
	private locationHint: string = "Location"
	private descriptionHint: string = "Description of the dish";
	private categoriesHint: string = "Categories of the dish";
	private priceHint: string = "Price of the dish";
	private urlHint: string = "The picture of the dish";
	private curUser: User;
	private friends: User[] = [];
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
			})
			.then(() => {
				if (this.curUser.friends) { 
					for (var i: number = 0; i < this.curUser.friends.length; i++) {
						this._profileService.findUserById(this.curUser.friends[i])
							.then(friend => this.friends.push(friend));
					}
				}
			});
	}
}
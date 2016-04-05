import {Component, Input, OnInit} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "../dish/dish-overview.component";
import {UserProfileComponent} from "./user-profile.component";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserSidebarComponent } from './user-sidebar.component';
import { UserOrderService } from './user-my-order.service'

@Component({
	selector: 'user-my-order',
	templateUrl: 'app/user/user-my-order.component.html',
	styleUrls: ['app/user/user-my-order.component.css'],
	directives: [ROUTER_DIRECTIVES, UserProfileComponent,UserAvatarComponent,UserSidebarComponent ],
	providers:[UserOrderService]
})
export class UserMyOrderComponent{
	@Input('user') curUser: User;
	private orders=[];


	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams,
		private _orderService: UserOrderService){}

	ngOnInit(){
		this._orderService.getOrder(this.curUser.id).subscribe(
			(res)=>this.orders=res,
			error => console.log(error)
			)

	}
}
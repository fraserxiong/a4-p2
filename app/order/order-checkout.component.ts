import { Component, OnInit } from 'angular2/core';
import { OrderService } from './order.service';
import { UserMainService } from '../user/user-main.service';
import { User } from '../model/user';

@Component({
	selector: 'order-checkout',
	templateUrl: 'app/order/order-checkout.component.html',
	styleUrls: [],
})
export class OrderCheckoutComponent implements OnInit{
	private user: User;

	constructor(private _orderService: OrderService,
				private _userService: UserMainService){}

	ngOnInit(){
		this._userService.user.subscribe(
			(curUser: User) => this.user = curUser,
			(error: any) => console.log('error: ' + error)
			);
	}

	submitOrder(address: string){
		console.log('address: ' + address);
	}
}
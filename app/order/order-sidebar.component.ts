import { Component, OnInit } from 'angular2/core';
import { OrderService } from './order.service';
import { OrderDishItemComponent } from './order-dishitem.component';
import { Order } from '../model/order';
import { Dish } from '../model/dish';
import { Router } from 'angular2/router';

@Component({
	selector: 'order-sidebar',
	templateUrl: 'app/order/order-sidebar.component.html',
	styleUrls: ['app/order/order-sidebar.component.css'],
	directives: [OrderDishItemComponent]
})
export class OrderSidebarComponent implements OnInit{
	order: Order;

	constructor(private _orderService: OrderService,
				private _router: Router){}

	ngOnInit(){
		this.order = this._orderService.order;
	}

	get total(): number{
		return this._orderService.total;
	}

	private remove(dish: Dish){
		this._orderService.remove(dish);
		this.order = this._orderService.order;
	}

	private checkOut(){
		// this._orderService.saveOrder()
		// 	.subscribe(
		// 		(successMessage: string) => {
		// 			console.log(successMessage);
		// 		},
		// 		(error: any) => {
		// 			console.log(error);
		// 		})
		this._router.navigate(['./Order', 'CheckOut']);
	}
}
import { Component, OnInit } from 'angular2/core';
import { OrderService } from './order.service';
import { OrderDishItemComponent } from './order-dishitem.component';
import { Order } from '../model/order';
import { Dish } from '../model/dish';

@Component({
	selector: 'order-sidebar',
	templateUrl: 'app/order/order-sidebar.component.html',
	styleUrls: ['app/order/order-sidebar.component.css'],
	directives: [OrderDishItemComponent]
})
export class OrderSidebarComponent implements OnInit{
	order: Order;

	constructor(private _orderService: OrderService){}

	ngOnInit(){
		this.order = this._orderService.order;
	}

	get total(): number{
		if (!this.order){
			return 0;
		}
		var count = 0;
		for (var i = 0; i < this.order.dishes.length; i++){
			count += this.order.dishes[i].dish.price * this.order.dishes[i].quantity;
		}
		return count;
	}

	private remove(dish: Dish){
		this._orderService.remove(dish);
		this.order = this._orderService.order;
	}
}
import { Injectable } from 'angular2/core';
import { Order } from '../model/order';
import { Dish } from '../model/dish';
import { User } from '../model/user';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService{

	private _order: Order;

	constructor(private _http: Http){
		let user1: User = {
			id: 10000,
			name: "Bill Gates",
			email: "gates.bill@gmail.com",
			password: "lalala",
		};
		
		this._order = new Order(user1);
	}

	add(dish: Dish, quantity: number){
		this._order.addDish(dish, quantity);
	}
	
	get order(): Order{
		return this._order;
	}

	get total(): number {
		if (!this.order) {
			return 0;
		}
		var count = 0;
		for (var i = 0; i < this.order.dishes.length; i++) {
			count += (this.order.dishes[i].dish.price ? this.order.dishes[i].dish.price : 0) * this.order.dishes[i].quantity;
		}
		return count;
	}

	remove(dish: Dish){
		this._order.removeDish(dish);
	}

	saveOrder(): Observable<string>{
		let body = JSON.stringify(this._order);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options: RequestOptions = new RequestOptions({ headers: headers });

		return this._http.post('/orders', body, options)
			.map((res: Response) => {
				let orderDoc = res.json();
				this._order.id = orderDoc._id;
				return "Success";
			})
			.catch(err => {
				return Observable.throw("Error: " + err);
			})
	}
}
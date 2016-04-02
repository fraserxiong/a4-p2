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
		let dish1 = {
			id: 11,
			url: "images/offer4.jpg",
			location: "35 Hayden Street.",
			description: "For a full on omega-3 fix, this bento is ideal. Marinate cooked shrimp overnight in an onion, garlic, oregano, and olive oil mixture. A starberry cake is aside and the meal’s done! A bed of salad greens adds a little color (and, well, good-for-you stuff including vitamins A, C, K, and folate).",
			name: "Marinated Shrimp Salad",
			categories: ["Lunch", "Perfect combo"],
			price: 8.99
		};
		
		this._order = new Order(user1);
		this._order.addDish(dish1, 3);
	}
	
	get order(): Order{
		return this._order;
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
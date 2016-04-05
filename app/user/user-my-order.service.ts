import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Order } from '../model/order';

@Injectable()
export class UserOrderService{
	constructor(private _http: Http){}

	getOrder(id):Observable<Order[]>{
		let url = "/accounts/"+ id+"/orders";
		return this._http.get(url)
			.map((res:Response)=>{
				let result_list =res.json();
				let orders=[];
				for (var i=0; i< result_list.length; i++){

					let order={
						num:result_list[i].id,
						_id:result_list[i]._id,
						address:result_list[i].address,
						dishes:result_list[i].dishes,	
					}
					orders.push(order)
				}
				return orders; 
			})
			.catch((err: Response) => {
				console.log(err);
				return Observable.throw(err.json() || "Server Error");
			});
	}




}
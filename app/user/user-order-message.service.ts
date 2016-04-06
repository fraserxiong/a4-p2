import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class OrderMessageService{
	constructor(private _http: Http){}

	get ordermessage(){

		return this._http.get('/api/msg/Order/')
			.map((res:Response)=>{
				let result_list =res.json();
				return result_list; 
			})
			.do((res: User) => console.log(res))
			.catch((err: Response) => {
				console.log(err);
				return Observable.throw(err.json() || "Server Error");
			});
	}
}
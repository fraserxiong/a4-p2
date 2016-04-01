import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Dish } from './dish.payload';

@Injectable()
export class DishUploadService{
	constructor(private _http: Http){}

	uploadDish(dish: Dish): Observable<string>{
		let body: string = JSON.stringify(dish);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options: RequestOptions = new RequestOptions({ headers: headers });

		return this._http.post('/posts/create', body, options)
			.map((res: Response) => <string>res.statusText)
			.do((res: string) => console.log(res))
			.catch((err: Response) => {
				console.log(err);
				return Observable.throw(err.json() || "Server Error");
			});
	}
}
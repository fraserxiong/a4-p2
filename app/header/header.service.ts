import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class GetUsernameService{
	constructor(private _http: Http){}

	getusername(){
		return this._http.get('/api/account/user')
						.map((res: Response) => <string>res.json().username)
						.catch((err: Response) => {
							console.log(err);
							return Observable.throw(err.json() || "Server Error");
						});
	}
}
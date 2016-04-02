import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class UserSignupService{
	constructor(private _http: Http){}

	// signup(): Observable<string>{
		// return this._http.get('/api/account/user', options)
		// 				.map((res: Response) => <string>res.json().username)
		// 				.catch((err: Response) => {
		// 				});
	// }
}

import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class ProfileEditService{
	constructor(private _http: Http){}

	updateuser(user):Observable<string>{
		let body = JSON.stringify(user);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options: RequestOptions = new RequestOptions({ headers: headers });

		return this._http.put('/account/settings', body, options)
			.map((res: Response) => <string>res.statusText)
			.do((res: string) => console.log(res))
			.catch((err: Response) => {
				console.log(err);
				return Observable.throw(err.json() || "Server Error");
			});
	}
}
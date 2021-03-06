import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Authenticator } from '../authentication/authentication.service';

@Injectable()
export class UserSignupService{
	constructor(private _http: Http, private _authenticator: Authenticator){}

	usersignup(user): Observable<string>{
		let body: string = JSON.stringify(user);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options: RequestOptions = new RequestOptions({ headers: headers });

		return this._http.post('/signup', body, options)
			.map((res: Response) => <string>res.statusText)
			.do((res: string) => console.log(res))
			.catch((err: Response) => {
				console.log(err);
				return Observable.throw(err.json() || "Server Error");
			});
	}

	oauthSignup(email: string): Observable<string>{
		let body: string = JSON.stringify(
			{ email: email,
			  errfor: {},
			  errors: []
			});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options: RequestOptions = new RequestOptions({ headers: headers });

		return this._http.post('/signup/social/', body, options)
			.map((res: Response) => {
				this._authenticator.refresh();
				return <string>res.statusText;
			})
			.do((res: string) => console.log(res))
			.catch((err: any) => {
				console.log(err);
				return Observable.throw(err.json() || "Sign Up Error");
			})
	}
}

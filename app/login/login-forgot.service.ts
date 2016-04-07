import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginForgotService{
	constructor(private _http: Http){}

	forgotPassword(email: string): Observable<boolean>{
		let body = JSON.stringify({'email': email});
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options: RequestOptions = new RequestOptions({ headers: headers });

		return this._http.post('/login/forgot/', body, options)
			.map((res: Response) => {
				let success: boolean = res.json().success;
				return Boolean(success);
			})
			.catch((err: any) => {
				return Observable.throw("Error: " + err);
			})
	}
}
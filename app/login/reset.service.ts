import { Injectable } from 'angular2/core';
import { Http, Response, RequestOptions, Headers } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResetService{
	constructor(private _http: Http){};

	reset(email: string, token: string, password: string, confirm: string): Observable<boolean>{
		if (password != confirm){
			return Observable.throw(false);
		}
		let body = JSON.stringify({ 'email': email, 'password': password, 'confirm': confirm });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options: RequestOptions = new RequestOptions({ headers: headers });

		let putUrl = '/login/reset/' + email + "/" + token + "/";
		return this._http.put(putUrl, body, options)
			.map((res: Response) => {
				return res.json().success;
			})
			.catch((err:any) => {
				return Observable.throw('Error');
			});
	}
}
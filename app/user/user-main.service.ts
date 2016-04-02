import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class UserMainService{
	constructor(private _http: Http){}

	get user():Observable<User>{

		return this._http.get('/api/account/user/settings')
			.map((res:Response)=>{
				let juser =res.json().data.account;
				let name=juser.name.full;
				let phone=juser.phone;
				let user:User={
					name:name,
					phone_number:phone
				}
				return user; 
			})
			.do((res: User) => console.log(res))
			.catch((err: Response) => {
				console.log(err);
				return Observable.throw(err.json() || "Server Error");
			});
	}
}
import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class UserMainService{
	constructor(private _http: Http){}

	get user():Observable<User>{

		return this._http.get('/api/account/user/friend')
			.map((res:Response)=>{
				let juser =res.json().data.account;
				let userinfo = res.json().data.user;
				let name=juser.name.full;
				let first = juser.name.first;
				let middle=juser.name.middle;
				let last = juser.name.last;
				let phone=juser.phone;
				let email=userinfo.email;
				let postcode = juser.zip;
				let avatar_url=juser.avatar;
				let address = juser.address;
				let id = juser._id;
				let user:User={
					id:id,
					first_name: first,
					middle_name:middle,
					last_name: last,
					name:name,
					email:email,
					postcode:postcode,
					phone_number:phone,
					avatar_url:avatar_url,
					address:address
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
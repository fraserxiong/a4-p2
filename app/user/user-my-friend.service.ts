import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class UserFriendService{
	constructor(private _http: Http){}

	get user():Observable<User>{

		return this._http.get('/api/account/user/friend/')
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


	friend_search(keyword):Observable<User[]>{
		let search = '/api/account/?search='+keyword;
		return this._http.get(search)
			.map((res:Response)=>{
				let user_list =res.json();
				let search_result:User[]=[];
				for (var i=0; i< user_list.length; i++){
					let user:User={
						id:user_list[i].id,
						name:user_list[i].name,
						avatar_url:user_list[i].avatar			
					}
					search_result.push(user)
				}
				return search_result; 
			})
			.do((res: User) => console.log(res))
			.catch((err: Response) => {
				console.log(err);
				return Observable.throw(err.json() || "Server Error");
			});
	}



}
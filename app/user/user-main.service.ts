import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import {Dish} from "../model/dish";
import 'rxjs/Rx';

@Injectable()
export class UserMainService{

	private _get_post_by_user_url = '/posts/auth/posts_by_user';
	private _get_post_for_admin_url = '/posts/admin';
	constructor(private _http: Http){}

	private _delete_post_url = '/posts/delete/';
	private _admin_delete_post_url = '/posts/admin/delete/';

	delete_post(id) : Promise<Dish[]>{
		return this._http.delete(this._delete_post_url + id)
						.toPromise()
						.then( _ => {return this.get_posts_by_user()}, this.handleError);
	}

	admin_delete_post(id) : Promise<Dish[]>{
		return this._http.delete(this._admin_delete_post_url + id)
						.toPromise()
						.then( _ => {return this.get_all_post_for_admin()}, this.handleError);
	}

	get_all_post_for_admin(): Promise<Dish[]> {

		return this._http.get(this._get_post_for_admin_url)
						 .toPromise()
						 .then(res => <Dish[]> res.json(), this.handleError)
						 .then(data => {console.log(data); return data});
	}

	get user():Observable<User>{

		return this._http.get('/api/account/user/settings')
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

	get_posts_by_user() : Promise<Dish[]>{

		return this._http.get(this._get_post_by_user_url)
				   .toPromise()
				   .then(res => <Dish[]> res.json(), this.handleError)
				   .then(data => {console.log(data); return data});
	}

	private handleError (error: any) {
	  // in a real world app, we may send the error to some remote logging infrastructure
	  // instead of just logging it to the console
	  console.error(error);
	  return Promise.reject(error.message || error.json().error || 'Server error');
	}
}

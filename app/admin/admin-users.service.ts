import { Injectable } from 'angular2/core';
import { Http, Headers, Response, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';


@Injectable()
export class AdminUsersService{
	constructor(private _http: Http) { }

	allUsers(): Observable<User[]>{
		return this._http.get('/admin/users/').map(
			(res: Response) => {
				let data = res.json().data;
				let users: User[] = [];
				for (var i = 0; i < data.length; i++){
					let datum = data[i];
					let user: User = {
						email: datum.email,
						name: datum.username
					}
					users.push(user);
				}
				return users;
			}).catch((err: any) => {
				return Observable.throw('Error');
			});
	}
}
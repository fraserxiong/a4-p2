import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class DeleteFriendService{
	constructor(private _http: Http){}
	
	deletefriend(id){
		let url = '/api/account/user/del_friend/'+id+'/'
		return this._http.delete(url)
					.map((res:Response)=>{return 'success'} )
					.catch((err: Response) => {
						console.log(err);
						return Observable.throw(err.json() || "Server Error");
					});
	}




}
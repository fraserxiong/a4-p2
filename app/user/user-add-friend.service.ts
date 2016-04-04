import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class AddFriendService{
	constructor(private _http: Http){}


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

	addfriend(id){
		let add = '/api/account/user/add_friend/'+id +'/';
		return this._http.put(add,null)
					.map((res:Response)=>{return 'success'} )
					.catch((err: Response) => {
						console.log(err);
						return Observable.throw(err.json() || "Server Error");
					});
	}



}
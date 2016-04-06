import { Injectable } from 'angular2/core';
import { Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';

@Injectable()
export class FriendMessageService{
	constructor(private _http: Http){}

	get friend():Observable<User[]>{

		return this._http.get('/api/msg/friend/')
			.map((res:Response)=>{
				let user_list =res.json();
				let result_list:User[]=[];
				for (var i=0; i< user_list.length; i++){

					let user:User={
						id:user_list[i].id,
						name:user_list[i].name,
						avatar_url:user_list[i].avatar	
					}
					result_list.push(user)
				}
				return result_list; 
			})
			.do((res: User) => console.log(res))
			.catch((err: Response) => {
				console.log(err);
				return Observable.throw(err.json() || "Server Error");
			});
	}

	accept(id){
		let url = '/api/msg/friend/' + id +'/';
		return this._http.put(url,'{}')
					.map((res:Response)=>{return 'success'} )
					.catch((err: Response) => {
						console.log(err);
						return Observable.throw(err.json() || "Server Error");
					});
	}

	declined(id){
		let url='/api/msg/friend/'+id+'/';
		return this._http.delete(url)
					.map((res:Response)=>{return 'success'} )
					.catch((err: Response) => {
						console.log(err);
						return Observable.throw(err.json() || "Server Error");
					});
	}
}
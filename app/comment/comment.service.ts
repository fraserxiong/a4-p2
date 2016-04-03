import { Comment } from '../model/comment';
import { Injectable } from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/Rx';

@Injectable()
export class CommentService{

	private _post_comment_url = '/comments/create';
	private _get_all_comment_url = '/comments/get_all/';
	private _delete_comment_url = '/comments/delete/';

	constructor(
		private http: Http
	){}

	getCommentForDish(id: number): Promise<Comment[]>{

		return this.http.get(this._get_all_comment_url + id)
						.toPromise()
						.then(res => <Comment[]> res.json(), this.handleError)
						.then(data => {console.log(data); return data});
	}

	submit_comment(id, comment, rating) : Promise<Comment[]>{

		let date_options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

		let json = {
			target_id: id,
			message: comment,
			rating: rating,
			date: new Date().toLocaleDateString('en-US', date_options)
		};
		let body: string = JSON.stringify(json);
		let headers = new Headers({'Content-Type': 'application/json'});
		let options: RequestOptions = new RequestOptions({ headers: headers });

		return this.http.post(this._post_comment_url, body, options)
						.toPromise()
						.then( _ => {return this.getCommentForDish(id)}, this.handleError);
	}

	delete(id, dish) : Promise<Comment[]>{

		return this.http.delete(this._delete_comment_url + id)
						.toPromise()
						.then( _ => {return this.getCommentForDish(dish)}, this.handleError);
	}

	private handleError (error: any) {
	  // in a real world app, we may send the error to some remote logging infrastructure
	  // instead of just logging it to the console
	  console.error(error);
	  return Promise.reject(error.message || error.json().error || 'Server error');
	}
}

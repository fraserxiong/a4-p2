import {Injectable} from 'angular2/core';
import { Dish } from './model/dish';
import { Comment } from './model/comment';
import {Http, Response} from 'angular2/http';
import { Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AppOfferService{

	constructor(
		private http: Http
	){}

	private _get_post_detail_url = '/posts/';
	private _get_hotest_url = '/posts/recommended';
	private _get_related_post_url = '/posts/related/';
	private _search_post_by_query_url = '/posts/search/';

	get_hotest_offers() : Promise<Dish[]>{

		return this.http.get(this._get_hotest_url)
						.toPromise()
						.then(res => <Dish[]> res.json(), this.handleError)
						.then(data => {console.log(data); return data});
	}

	get_post_details(id) : Promise<Dish>{

		return this.http.get(this._get_post_detail_url + id)
						.toPromise()
						.then(res => <Dish> res.json(), this.handleError)
						.then(data => {console.log(data); return data});
	}

	get_related_posts(tag) : Promise<Dish[]>{


		return this.http.get(this._get_related_post_url + tag)
						.toPromise()
						.then(res => <Dish[]> res.json(), this.handleError)
						.then(data => {console.log(data); return data});

	}

	search_by_query(query) : Promise<Dish[]>{

		return this.http.get(this._search_post_by_query_url + query)
						.toPromise()
						.then(res => <Dish[]> res.json(), this.handleError)
						.then(data => {console.log(data); return data});;
	}

	private handleError (error: any) {
	  // in a real world app, we may send the error to some remote logging infrastructure
	  // instead of just logging it to the console
	  console.error(error);
	  return Promise.reject(error.message || error.json().error || 'Server error');
	}
}

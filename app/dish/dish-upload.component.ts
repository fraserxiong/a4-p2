import {Component, Input, OnInit, Inject} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "./dish-overview.component";
import {UserProfileComponent} from "../user/user-profile.component";
import {Router,RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from '../user/user-profile.service';
import { UserAvatarComponent } from '../user/user-avatar.component';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import { UserSidebarComponent } from '../user/user-sidebar.component';

@Component({
	selector: 'dish-upload',
	templateUrl: 'app/dish/dish-upload.component.html',
	styleUrls: ['app/dish/dish-upload.component.css'],
	directives: [ROUTER_DIRECTIVES,DishOverviewComponent,UserSidebarComponent],
	providers: [HTTP_PROVIDERS]
})
export class DishUploadComponent{
	private nameHint: string = "Dish Name";
	private locationHint: string = "Location"
	private descriptionHint: string = "Description of the dish";
	private categoriesHint: string = "Categories of the dish";
	private priceHint: string = "Price of the dish";
	private urlHint: string = "The picture of the dish";
	private curUser: User;
	private friends: User[] = [];
	private curId: number;

	constructor(
		private _profileService: UserProfileService,
		private _routeParams: RouteParams,
		private http: Http,
		@Inject(Router) private _router: Router){}


	onUpload( name ,location,description,categories, price, url){
		var cat = categories.split(",");
		var new_dish={
		name : name,
		locaton :location,
		description : description,
		categories : cat,
		price : price,
		url : url
		};


		var data = JSON.stringify(new_dish);
		this.http.post('/posts/create', data)
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
		this.onAuthenticationPass();
	}

	onAuthenticationPass() {
		this._router.navigate(['UserMyDish',{id: this.curId}]);
	}

	private handleError (error: any) {
	  // in a real world app, we may send the error to some remote logging infrastructure
	  // instead of just logging it to the console
	  console.error(error);
	  return Promise.reject(error.message || error.json().error || 'Server error');
	}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');
		this._profileService.findUserById(id)
			.then(user => {
				this.curUser = user;
				this.curId = user.id;
			})
			.then(() => {
				if (this.curUser.friends) { 
					for (var i: number = 0; i < this.curUser.friends.length; i++) {
						this._profileService.findUserById(this.curUser.friends[i])
							.then(friend => this.friends.push(friend));
					}
				}
			});
	}
}
import { Component, OnInit}       from 'angular2/core';
import {RouteParams}       from 'angular2/router';
import {user_db, user} from './user.service';
import {AppFooterComponent} from '../app-footer.component';
import {AppHeaderComponent} from '../app-header.component';

@Component(
{
	selector: 'user',
	templateUrl: "app/user/user-profile.component.html",
  styleUrls: ['app/user/user-profile.component.css'],
	directives: [AppHeaderComponent, AppFooterComponent],
	providers: [user_db]
})

export class UserProfileComponent implements OnInit{
	id: number;
	cur_user: user;

	constructor(
		private _db: user_db,
		private _routeParams: RouteParams){}

	get_user(){
		return this.cur_user;
	}

	ngOnInit(){
		this.id = + this._routeParams.get('id');
		let user_list = this._db.get_list();
		for(var i = 0; i < user_list.length; i++){
			let u_obj = user_list[i];
			if(u_obj.id == this.id){
				this.cur_user = u_obj;
			}
		}
	}
}

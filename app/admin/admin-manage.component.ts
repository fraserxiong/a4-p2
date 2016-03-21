import { Component, OnInit}       from 'angular2/core';
import {AppOfferService} from '../app-offer.service';
import {user_db, user} from '../user/user.service';
import {Router, OnActivate, ComponentInstruction} from 'angular2/router';
import {Authenticator} from '../authentication/authentication.service';
import {Dish} from '../model/dish';

enum State{
	User,
	Food
}

@Component({
	selector: 'admin-manage',
	templateUrl: 'app/admin/admin-manage.component.html',
	styleUrls:['app/admin/admin-manage.component.css'],
	providers: [AppOfferService, user_db]
})
export class AdminManageComponent implements OnInit, OnActivate{
	results: Dish[] = [];
	user_list: user[] = [];

	stateEnum = State;
	state: State;

	constructor(
		private _offerService: AppOfferService,
		private _db: user_db,
		private _router: Router,
		private _authenticator: Authenticator
	){}

	ngOnInit(){
		this._offerService.search_by_query('abc')
			.then(results => this.results = results);
		this.user_list = this._db.get_list();
	}

	gotoState(state: State): void{
		this.state = state;
	}

	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction){
		if(!this._authenticator.signedIn){
			this._router.navigate(['AdminLogin']);
		}
	}
}

import { Component, OnInit}       from 'angular2/core';
import { AppOfferService } from '../app-offer.service';
import { Dish } from '../model/dish';
import { RouteParams, Router} from 'angular2/router';
import { DishListComponent} from '../dish/dish-list.component';

@Component(
{
	selector: "search",
	templateUrl: "app/search/search-display.component.html",
	styleUrls: ["app/search/search-display.component.css"],
	providers: [AppOfferService],
	directives: [DishListComponent]
})

export class SearchComponent implements OnInit {

	results: Dish[] = [];

	constructor(
		private _offerService: AppOfferService,
		private _router: Router,
		private _routeParams: RouteParams
	){}

	ngOnInit(){
		this._offerService.search_by_query(this.get_query())
			.then(results => this.results = results);
	}

	get_query(){
		return decodeURIComponent(this._routeParams.get("query"));
	}

	get_result_length(){
		return this.results.length;
	}

}

import { Component, OnInit}       from 'angular2/core';
import { AppOfferService } from '../app-offer.service';
import { Dish } from '../model/dish';
import { RouteParams, Router} from 'angular2/router';
import { DishListComponent} from '../dish/dish-list.component';
import { SearchInputComponent } from './search-input.component';

@Component(
{
	selector: "search",
	templateUrl: "app/search/search-display.component.html",
	styleUrls: ["app/search/search-display.component.css"],
	directives: [DishListComponent, SearchInputComponent]
})

export class SearchComponent implements OnInit {
	private query: string;
	private results: Dish[] = [];

	constructor(
		private _offerService: AppOfferService,
		private _router: Router,
		private _routeParams: RouteParams
	){}

	ngOnInit(){
		this.query = this._routeParams.get('query');
		this._offerService.search_by_query(this.query)
			.then(results => this.results = results);
	}

}

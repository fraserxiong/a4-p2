import { Component, OnInit}       from 'angular2/core';
import {AppFooterComponent} from '../app-footer.component';
import {AppOfferService} from '../app-offer.service';
import {FullOffer} from '../app-offer.service';
import {RouteParams, Router} from 'angular2/router';
import {AppHeaderComponent} from '../app-header.component';

@Component(
{
	selector: "search",
	templateUrl: "app/search/search-display.component.html",
	styleUrls: ["css/search.css", "css/common.css"],
	directives: [AppHeaderComponent,AppFooterComponent],
	providers: [AppOfferService]
})

export class SearchComponent implements OnInit {

	results: FullOffer[] = []

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

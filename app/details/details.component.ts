import { Component, OnInit} from 'angular2/core';
import {AppFooterComponent} from '../app-footer.component';
import {AppOfferService} from '../app-offer.service';
import {FullOffer, Comment} from '../app-offer.service';
import {RouteParams, Router} from 'angular2/router';
import {AppHeaderComponent} from '../app-header.component';

@Component(
{
	selector: "post-details",
	templateUrl: "app/details/details.component.html",
	styleUrls: ["css/details.css", "css/common.css"],
	directives: [AppHeaderComponent, AppFooterComponent],
	providers: [AppOfferService]
})

export class DetailsComponent implements OnInit {

	item: FullOffer = {
		id: 0,
		url: "dummy",
		location: "dummy",
		description: "dummy",
		name: "dummy",
		categories: [],
		price: 0
	};
	related: FullOffer[] = [];

	comments: Comment[] = [];

	constructor(
		private _offerService: AppOfferService,
		private _router: Router,
		private _routeParams: RouteParams
	){}

	ngOnInit(){
		this._offerService.get_post_details(this.get_id())
			.then(result => this.item = result);

		this._offerService.get_related_posts(this.get_id())
			.then(related => this.related = related);

		this._offerService.get_comments_for_post(this.get_id())
			.then(comments => this.comments = comments);
	}

	get_id(){
		return decodeURIComponent(this._routeParams.get("id"));
	}

}

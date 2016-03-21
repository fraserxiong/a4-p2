import { Component, OnInit} from 'angular2/core';
import {AppOfferService} from '../app-offer.service';
import {Dish} from '../model/dish';
import {Comment} from '../model/comment';
import {RouteParams, Router} from 'angular2/router';

@Component(
{
	selector: "post-details",
	templateUrl: "app/details/details.component.html",
	styleUrls: ["app/details/details.component.css"],
	providers: [AppOfferService]
})

export class DetailsComponent implements OnInit {

	item: Dish = {
		id: 0,
		url: "dummy",
		location: "dummy",
		description: "dummy",
		name: "dummy",
		categories: [],
		price: 0
	};
	related: Dish[] = [];

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

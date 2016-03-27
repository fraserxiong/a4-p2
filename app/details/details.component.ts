import { Component, OnInit } from 'angular2/core';
import { AppOfferService } from '../app-offer.service';
import { Dish } from '../model/dish';
import { Comment } from '../model/comment';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { CapitalizePipe } from '../pipe/capitalize.pipe';
import { CommentService } from '../comment/comment.service';
import { CommentComponent } from '../comment/comment.component';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component(
{
	selector: "post-details",
	templateUrl: "app/details/details.component.html",
	styleUrls: ["app/details/details.component.css"],
	directives: [CommentComponent, ROUTER_DIRECTIVES],
	pipes: [CapitalizePipe],
	providers: [HTTP_PROVIDERS, AppOfferService]
})

export class DetailsComponent implements OnInit {

	item: Dish = null;
	related: Dish[] = [];

	comments: Comment[] = [];

	constructor(
		private _offerService: AppOfferService,
		private _router: Router,
		private _routeParams: RouteParams,
		private _commentService: CommentService
	){}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');

		this._offerService.get_post_details(this.get_id())
			.then(result => {
				this.item = result;
				this._offerService.get_related_posts(this.item.categories.join(","))
					.then(related => this.related = related);
			});

		this._commentService.getCommentForDish(id)
			.then(comments => this.comments = comments);

	}

	get_id(){
		return decodeURIComponent(this._routeParams.get("id"));
	}

}

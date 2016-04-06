import { Component, OnInit } from 'angular2/core';
import { AppOfferService } from '../app-offer.service';
import { Dish } from '../model/dish';
import { Comment } from '../model/comment';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { CapitalizePipe } from '../pipe/capitalize.pipe';
import { CommentService } from '../comment/comment.service';
import { CommentComponent } from '../comment/comment.component';
import { HTTP_PROVIDERS }    from 'angular2/http';
import { OrderService } from '../order/order.service';
import { Authenticator } from '../authentication/authentication.service';

@Component(
{
	selector: "post-details",
	templateUrl: "app/details/details.component.html",
	styleUrls: ["app/details/details.component.css"],
	directives: [CommentComponent, ROUTER_DIRECTIVES],
	pipes: [CapitalizePipe],
})

export class DetailsComponent implements OnInit {

	item: Dish = null;
	related: Dish[] = [];

	comments: Comment[] = [];
	ratings: boolean[] = [false, false, false, false, false];
	ratingsVal = 0;

	constructor(
		private _offerService: AppOfferService,
		private _router: Router,
		private _routeParams: RouteParams,
		private _commentService: CommentService,
		private _orderService: OrderService,
		private _authenticator: Authenticator
	){}

	ngOnInit(){
		let id: number = + this._routeParams.get('id');

		this._offerService.get_post_details(this.get_id())
			.then(result => {
				if(result){
					this.item = result;
					this._offerService.get_related_posts(id, this.item.categories.join(","))
						.then(related => this.related = related);
				}
			});

		this._commentService.getCommentForDish(id)
			.then(comments => this.comments = comments);

	}

	get_id(){
		return decodeURIComponent(this._routeParams.get("id"));
	}

	private comment(comment: String){
		if (!this._authenticator.signedIn) {
			this._commentService.submit_comment(this.get_id(), comment, this.ratingsVal)
				.then(comments => this.comments = comments);
		}
	}

	onDelete(){
		var scope = this;
		return function(id: String){
			scope._commentService.delete(id, scope.get_id())
				.then(comments => scope.comments = comments);
		}

	}

	changeRating(idx){
		for(var i = 0; i < 5; i++){
			if(i <= idx)
				this.ratings[i] = true;
			else
				this.ratings[i] = false;
		}
		this.ratingsVal = idx + 1;
	}

	order(quantity: number){
		if (quantity > 0) {
			this._orderService.add(this.item, quantity);
		}
	}

}

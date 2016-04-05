import { Component, OnInit}       from 'angular2/core';
import {AppOfferService} from '../app-offer.service';
import { Dish } from '../model/dish';
import { Router} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';

@Component(
{
	selector: 'home-offer',
	templateUrl: "app/home/app-offer.component.html",
	styleUrls: ["app/home/app-offer.component.css"],
	providers: [HTTP_PROVIDERS, AppOfferService]
})

export class AppOfferComponent implements OnInit{
	offerImages: Dish[] = [];
	displayImages: Dish[][];
	max: number;

	constructor(
		private _offerService: AppOfferService,
		private _router: Router
	){
		this.max = 3;
	}

	getOfferImages(){
		this._offerService.get_hotest_offers()
						  .then(images => {this.offerImages = images;
							  this.displayImages = [this.offerImages.slice(0, this.max)]});
	}

	ngOnInit(){
		this.getOfferImages();
	}

	get_details(post){
		this._router.navigate(["Details", {id: post.id}]);
	}

	expand(){
		this.max = this.max + 3;
		this.displayImages = [];
		for(var i = 0; i * 3 < this.max && i * 3 < 12; i++){
			this.displayImages.push(this.offerImages.slice(i * 3, i * 3 + 3));
		}
	}
}

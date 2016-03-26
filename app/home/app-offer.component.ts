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
	offerImages: Dish[];

	constructor(
		private _offerService: AppOfferService,
		private _router: Router
	){}

	getOfferImages(){
		this._offerService.get_hotest_offers().then(images => this.offerImages = images);
	}

	ngOnInit(){
		this.getOfferImages();
	}

	get_details(post){
		this._router.navigate(["Details", {id: post.id}]);
	}
}

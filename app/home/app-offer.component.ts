import { Component, OnInit}       from 'angular2/core';
import {AppOfferService} from '../app-offer.service';
import {OfferImage} from '../app-offer.service';
import { Router} from 'angular2/router';

@Component(
{
	selector: 'home-offer',
	templateUrl: "app/home/app-offer.component.html",
	providers: [AppOfferService]
})

export class AppOfferComponent implements OnInit{
	offerImages: OfferImage[];

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

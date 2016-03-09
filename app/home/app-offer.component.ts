import { Component, OnInit}       from 'angular2/core';
import {AppOfferService} from './app-offer.service';
import {OfferImage} from './app-offer.service';

@Component(
{
	selector: 'home-offer',
	templateUrl: "app/home/app-offer.component.html",
	providers: [AppOfferService]
})

export class AppOfferComponent implements OnInit{
	offerImages: OfferImage[];

	constructor(private _offerService: AppOfferService){

	}

	getOfferImages(){
		this._offerService.get_hotest_offers().then(images => this.offerImages = images);
	}

	ngOnInit(){
		this.getOfferImages();
	}
}
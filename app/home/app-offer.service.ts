import {Injectable} from 'angular2/core';

export interface OfferImage{
	id: number;
	url: string;
}

@Injectable()
export class AppOfferService{
	get_hotest_offers(){
		let images: OfferImage[] = [
			{ id: 1, url: "images/offer1.jpg"},
			{ id: 2, url: "images/offer2.jpg" },
			{ id: 3, url: "images/offer3.jpg" },
		];
		return Promise.resolve(images);
	}

	get_post_details(){
		return Promise.resolve(null);
	}
}
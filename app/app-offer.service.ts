import {Injectable} from 'angular2/core';

export interface OfferImage{
	id: number;
	url: string;
}

export interface FullOffer {
	id: number;
	url: string;
	name: string;
	location: string;
	description: string;
	categories: string[];
	price: number;
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

	search_by_query(query){
		let results: FullOffer[] = [
			{
				id: 1,
				url: "images/offer1.jpg",
	            location: "40 St. George Street.",
	            description: "St George Homemade Burgers",
	            name: "Burgers and Fries!",
	            categories: ["Fast", "Cheap"],
	            price: 4.99
			},
			{
				id: 2,
				url: "images/offer2.jpg",
	            location: "1001 Bay Street.",
	            description: "Homemade cheesecake for Valentine's!",
	            name: "Best Cheesecake in history",
	            categories: ["Sweet", "Desert"],
	            price: 7.99
			},
			{
				id: 3,
				url: "images/offer3.jpg",
	            location: "35 Hayden Street.",
	            description: "Fish and Chips! The Perfect Combo!",
	            name: "British tranditional food",
	            categories: ["Main", "Perfect combo"],
	            price: 10.50
			}
		]

		return Promise.resolve(results);
	}
}

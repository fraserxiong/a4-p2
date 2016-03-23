import {Component, Input, OnInit} from "angular2/core";

@Component({
	selector: 'rating',
	templateUrl: 'app/comment/rating.component.html',
	styleUrls: ['app/comment/rating.component.css'],
})
export class RatingComponent implements OnInit{
	@Input('rate') rate: number;

	private range: number[];

	ngOnInit(){
		this.range = new Array<number>(this.rate);
	}

}
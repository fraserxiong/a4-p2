import { Component, OnInit} from 'angular2/core';
import { Router} from 'angular2/router';

@Component(
{
	selector: "home-search",
	templateUrl: "app/home/app-search.component.html"
})

export class AppSearchComponent implements OnInit{

	constructor(
		private _router: Router
	){}

	ngOnInit(){}

	start_query(){
		this._router.navigate(["Search", { query: "abc"}])
	}

}

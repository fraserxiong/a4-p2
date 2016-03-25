import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
	selector: 'search-input',
	templateUrl: 'app/search/search-input.component.html',
	styleUrls: ['app/search/search-input.component.css'],
})
export class SearchInputComponent{
	
	constructor(private _router: Router) {}

	private search(query: String){
		this._router.navigate(['Search', { 'query': query }]);
	}
}
import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { SearchInputComponent } from '../search/search-input.component';

@Component(
{
	selector: "home-search",
	templateUrl: "app/home/app-search.component.html",
	styleUrls: ["app/home/app-search.component.css"],
	directives: [SearchInputComponent]
})

export class AppSearchComponent{

}

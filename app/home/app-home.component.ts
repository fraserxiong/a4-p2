import { Component, ViewEncapsulation }       from 'angular2/core';
import {AppGalleryComponent} from './app-gallery.component';
import {AppOfferComponent} from './app-offer.component';
import {AppSearchComponent} from './app-search.component';

@Component(
{
	selector: "home",
	templateUrl: "app/home/app-home.component.html",
	styleUrls: ["app/home/app-home.component.css"],
	directives: [AppGalleryComponent, AppOfferComponent, AppSearchComponent],
})

export class AppHomeComponent{

}

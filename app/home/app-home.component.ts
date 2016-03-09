import { Component }       from 'angular2/core';
import {AppGalleryComponent} from './app-gallery.component';
import {AppOfferComponent} from './app-offer.component';
import {AppSearchComponent} from './app-search.component';
import {AppFooterComponent} from '../app-footer.component';

@Component(
{
	selector: "home",
	templateUrl: "app/home/app-home.component.html",
	styleUrls: ["css/common.css", "css/home.css"],
	directives: [AppGalleryComponent, AppOfferComponent, AppSearchComponent, AppFooterComponent]
})

export class AppHomeComponent{

}

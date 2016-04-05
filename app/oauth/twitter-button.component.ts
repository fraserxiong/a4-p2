import { Component, Input } from 'angular2/core';

@Component({
	selector: 'twitter-button',
	templateUrl: 'app/oauth/twitter-button.component.html',
	styleUrls: ['app/oauth/twitter-button.component.css']
})
export class TwitterButtonComponent{
	@Input('hintText') hintText: string;
}
import { Component, Output, EventEmitter}       from 'angular2/core';
import { Authenticator } from '../authentication/authentication.service';
import { TwitterButtonComponent } from '../oauth/twitter-button.component';
import { ComponentInstruction, OnActivate } from 'angular2/router';

@Component(
{
	selector: 'login',
	templateUrl: 'app/login/login.component.html',
	styleUrls: ['app/login/login.component.css'],
	directives: [TwitterButtonComponent]
})
export abstract class LoginComponent implements OnActivate{
	private usernameHint: string = "Username/Email";
	private passwordHint: string = "Password";

	private authenticationPassed = false;
	private submitted = false;
	private errorMessage: string;

	private twitterLoginHint = "Log In With Twitter";

	private oauthLogin: boolean = false;
	private oauthLoginMessage: string = "We found a user linked to your Twitter account. Try logging in with twitter";
	
	constructor(private _authenticator: Authenticator) {
	}

	onLogin(username: string, password: string){
		this._authenticator.authenticate(username, password)
			.subscribe((messsage: string) => {
				if (this._authenticator.signedIn)
					this.onAuthenticationPass()
				else{
					this.onAuthenticationFailed(messsage);
				}
			},
			error => {
				this.onAuthenticationFailed(<string> error);
			});
	}

	onAuthenticationPass(){
		this.submitted = true;
		this.authenticationPassed = true;
	}

	onAuthenticationFailed(error?: string){
		this.submitted = true;
		this.authenticationPassed = false;
		if (error)
			this.errorMessage = error;
	}

	loginWithTwitter(){
		window.location.href = "/login/twitter";
	}

	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction){
		if (prev.urlPath.match(/^signup\/callback\/.+$/i)){
			this.oauthLogin = true;
		}
	}
}
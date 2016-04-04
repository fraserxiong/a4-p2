import { Component } from 'angular2/core';
import { UserSignupService } from '../signup/signup.service';

@Component({
	selector: 'oauth-callback',
	templateUrl:'app/oauth/oauth-callback.component.html',
	styleUrls: ['app/oauth/oauth-callback.component.css'],
	providers: [UserSignupService]
})
export class OAuthCallbackComponent{
	constructor(private _signupService: UserSignupService){}

	onSignup(email: string){
		this._signupService.oauthSignup(email)
			.subscribe(
				(success: string) => window.alert('success'),
				(err: any) => window.alert('error')
				);
	}

}
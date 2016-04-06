import { Component } from 'angular2/core';
import { UserSignupService } from '../signup/signup.service';
import { ComponentInstruction, Router, RouteParams, OnActivate } from 'angular2/router';

@Component({
	selector: 'oauth-callback',
	templateUrl:'app/oauth/oauth-callback.component.html',
	styleUrls: ['app/oauth/oauth-callback.component.css'],
	providers: [UserSignupService]
})
export class OAuthCallbackComponent implements OnActivate{
	private signUpResult: boolean = false;
	private submitted: boolean = false;

	constructor(private _signupService: UserSignupService,
				private _routeParams: RouteParams,
				private _router: Router){}

	onSignup(email: string){
		this._signupService.oauthSignup(email)
			.subscribe(
			(success: string) => {
				this.signUpResult = true;
				this.submitted = true;
				this._router.navigate(['Home']);
			},
			(err: any) => {
				this.signUpResult = false;
				this.submitted = true;
			});
	}

	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction){
		let userId = this._routeParams.get('id');
		if (userId){
			this._router.navigate(['UserLogin']);
		}
	}

}
import { Component, Output, EventEmitter}  from 'angular2/core';
import { Authenticator } from '../authentication/authentication.service';
import { UserSignupService } from './signup.service'
import { User } from '../model/user'
import { Router} from 'angular2/router';
import { TwitterButtonComponent } from '../oauth/twitter-button.component';

@Component(
{
	selector: 'signup',
	templateUrl: 'app/signup/signup.component.html',
	styleUrls: ['app/signup/signup.component.css'],
	providers:[UserSignupService, Location],
	directives: [TwitterButtonComponent]
})

export abstract class SignupComponent {
	private usernameHint: string = "Username";
	private emailHint: string = "Email"
	private passwordHint: string = "Please enter password";
	private repasswordHint: string = "Please confirm password";

	private twitterSignupHint: string = "Sign Up With Twitter";

	// Add this user to database.

	constructor(private _authenticator: Authenticator,
				private _signupService: UserSignupService,
				private _router: Router) {
	}

	onSignup(username: string, email:string, password: string){
		
		let user= {
			username: username,

			password: password,
			email: email,
			errfor:{},
			errors:[]
		};

		this._signupService.usersignup(user)
			.subscribe
			(successMessage => {
				console.log('Success: ' + successMessage);
				this._authenticator.authenticate(username, password)
									.subscribe
									(successMessage => this.onSignupPass(),
										error => console.log('error: ' + error));
			},
			 error => console.log('Error: ' + error));
	}

	signUpWithTwitter(){
		console.log('GO');
		window.location.href="/signup/twitter/"
	}

	onSignupPass(){
		this._router.navigate(['Home']);
	}
}

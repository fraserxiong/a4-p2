import { Component, Output, EventEmitter}  from 'angular2/core';
import { Authenticator } from '../authentication/authentication.service';
import { UserSignupService } from './signup.service'
import { User } from '../model/user'

@Component(
{
	selector: 'signup',
	templateUrl: 'app/signup/signup.component.html',
	styleUrls: ['app/signup/signup.component.css'],
	providers:[UserSignupService]
})

export abstract class SignupComponent {
	private usernameHint: string = "Username";
	private emailHint: string = "Email"
	private passwordHint: string = "Please enter password";
	private repasswordHint: string = "Please confirm password";

	// Add this user to database.

	constructor(private _authenticator: Authenticator,
				private _signupService: UserSignupService) {
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
			(successMessage => console.log('Success: ' + successMessage),
			 error => console.log('Error: ' + error));
		this.onAuthenticationPass();
	}

	onAuthenticationPass(){
	}
}

import { Component, Output, EventEmitter}  from 'angular2/core';
import { Authenticator } from '../authentication/authentication.service';

@Component(
{
	selector: 'signup',
	templateUrl: 'app/signup/signup.component.html',
	styleUrls: ['app/signup/signup.component.css'],
})

export abstract class SignupComponent {
	private usernameHint: string = "Username";
	private emailHint: string = "Email"
	private passwordHint: string = "Please enter password";
	private repasswordHint: string = "Please confirm password";
	private postcodeHint: string = "Please enter post code";

	// Add this user to database.
	
	constructor(private _authenticator: Authenticator) {
	}

	onSignup(username: string, password: string){
	}

	onAuthenticationPass(){
	}
}
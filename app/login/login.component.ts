import { Component, Output, EventEmitter}       from 'angular2/core';
import { Authenticator } from '../authentication/authentication.service';

@Component(
{
	selector: 'login',
	templateUrl: 'app/login/login.component.html',
	styleUrls: ['app/login/login.component.css'],
})
export abstract class LoginComponent {
	private usernameHint: string = "Username/Email";
	private passwordHint: string = "Password";
	
	constructor(private _authenticator: Authenticator) {
	}

	onLogin(username: string, password: string){
		this._authenticator.authenticate(username, password)
			.subscribe((success: string) => this.onAuthenticationPass(),
			error => console.log('error: ' + error));
	}

	onAuthenticationPass(){
	}
}
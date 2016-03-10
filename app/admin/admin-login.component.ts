import { Component }       from 'angular2/core';
import { AdminAuthenticationService} from "./admin-authentication.service";
import {Router} from 'angular2/router';

@Component({
	selector: "admin-login",
	templateUrl: "app/user/user-login.component.html",
	styleUrls: ["app/user/user-login.component.css"]
})

export class AdminLoginComponent{
	usernameHint: string = "Username";
	passwordHint: string = "Password";

	username: string;
	password: string;

	constructor(private _authenticator: AdminAuthenticationService, private _router: Router) {

	}
	onLogin() {
		if (this._authenticator.authenticate(this.username, this.password)){
			this._router.navigate(['AdminManage']);
		}
		else{
			//TODO: invalid username and password
		}
	}
}
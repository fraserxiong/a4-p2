import { Component }       from 'angular2/core';
import { UserAuthenticationService} from "./user-authentication.service";
import { Router} from 'angular2/router';

@Component({
	selector: "user-login",
	templateUrl: "app/user/user-login.component.html",
	styleUrls: ["app/user/user-login.component.css"]
})

export class UserLoginComponent{
	usernameHint: string = "Username/Email";
	passwordHint: string = "Password";

	username: string;
	password: string;

	constructor(private _authenticator: UserAuthenticationService, private _router: Router) {

	}
	onLogin() {
		if (this._authenticator.authenticate(this.username, this.password)){
			this._router.navigate(['Home']);
		}
		else{
			//TODO: invalid username and password
		}
	}
}
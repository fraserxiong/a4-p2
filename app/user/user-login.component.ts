import { Component }       from 'angular2/core';
import { AuthenticationService} from "./authentication.service";
import {Router} from 'angular2/router';

@Component({
	selector: "user-login",
	templateUrl: "app/user/user-login.component.html",
	styleUrls: ["app/user/user-login.component.css"]
})

export class UserLoginComponent{
	username: string;
	password: string;

	constructor(private _authenticator: AuthenticationService, private _router: Router){

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
import { Component, Inject }       from 'angular2/core';
import { UserAuthenticationService} from "./user-authentication.service";
import { Router} from 'angular2/router';
import { LoginComponent } from '../login/login.component';
import { Authenticator } from '../authentication/authentication.service';

// @Component({
// 	selector: "user-login",
// 	templateUrl: "app/user/user-login.component.html",
// 	styleUrls: ["app/user/user-login.component.css"]
// })

export class UserLoginComponent extends LoginComponent{

	constructor(@Inject(Authenticator) private authenticator: Authenticator, @Inject(Router) private _router: Router) {
		super(authenticator);
	}

	onAuthenticationPass() {
		this._router.navigate(['Home']);
	}
}
import { Component, Inject }       from 'angular2/core';
import { AdminAuthenticationService} from "./admin-authentication.service";
import { Router } from 'angular2/router';
import { LoginComponent } from '../login/login.component';
import { Authenticator } from '../authentication/authentication.service';


// @Component({
// 	selector: "admin-login",
// 	templateUrl: "app/user/user-login.component.html",
// 	styleUrls: ["app/user/user-login.component.css"]
// })
export class AdminLoginComponent extends LoginComponent{
	constructor(@Inject(Authenticator) private authenticator: Authenticator, @Inject(Router) private router: Router) {
		super(authenticator, router);
	}

	onAuthenticationPass(){
		this.router.navigate(['AdminManage']);
	}
}
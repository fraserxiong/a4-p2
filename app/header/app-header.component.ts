import { Component, OnInit }       from 'angular2/core';
import { ROUTER_DIRECTIVES, Router} from 'angular2/router';
import { Authenticator } from "../authentication/authentication.service";
import { User } from "../model/user";

@Component(
{
	selector: "custom-header",
	templateUrl: "app/header/app-header.component.html",
  	styleUrls: ["app/header/app-header.component.css"],
  	directives: [ROUTER_DIRECTIVES]
})

export class AppHeaderComponent implements OnInit{
	curUser: User;

	constructor(private _authenticator: Authenticator, private _router: Router) { }

	ngOnInit(){
		//this.curUser = this._authenticator.getCurUser();
	}

	logOut() {
		//this._authenticator.logOut();
		this._router.navigate(['Home']);
		this.curUser = null;
	}
}

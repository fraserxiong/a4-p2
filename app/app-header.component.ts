import { Component, OnInit }       from 'angular2/core';
import { ROUTER_DIRECTIVES} from 'angular2/router';
import { UserAuthenticationService} from "./user/user-authentication.service";
import {user} from './user/user.service';

@Component(
{
	selector: "header",
	templateUrl: "app/app-header.component.html",
  	styleUrls: ["app/app-header.component.css"],
  	directives: [ROUTER_DIRECTIVES]
})

export class AppHeaderComponent implements OnInit{
	curUser: user;

	constructor(private _userAuthenticator: UserAuthenticationService){}

	ngOnInit(){
		this.curUser = this._userAuthenticator.getCurUser();
	}
}

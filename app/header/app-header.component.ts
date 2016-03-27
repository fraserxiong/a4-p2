import { Component, OnInit, Input, Output, EventEmitter }       from 'angular2/core';
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
	@Input('user') curUser: User;
	@Output('cartToggle') cartToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

	private cartOpen: boolean = false;

	constructor(private _authenticator: Authenticator, private _router: Router) { }

	ngOnInit(){
		//this.curUser = this._authenticator.getCurUser();
	}

	toggleCart(): void {
		this.cartOpen = !this.cartOpen;
		this.cartToggle.emit(this.cartOpen);
	}

	logOut() {
		//this._authenticator.logOut();
		this._router.navigate(['Home']);
		this._authenticator.logOut();
	}
}

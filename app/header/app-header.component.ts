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
	@Input('user') curUser: string;

	@Output('cartToggle') cartToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Input('cartVisible') cartOpen: boolean;

	constructor(private _authenticator: Authenticator, 
				private _router: Router) { }

	ngOnInit(){
	}

	toggleCart(emitEvent: boolean): void {
		this.cartOpen = !this.cartOpen;
		if (emitEvent){
			this.cartToggle.emit(this.cartOpen);
		}
	}

	logOut() {
		//this._authenticator.logOut();
		this._router.navigate(['Home']);
		this._authenticator.logOut();
	}
}

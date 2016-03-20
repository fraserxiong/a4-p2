import {Injectable} from 'angular2/core';
import {Authenticator} from '../authentication/authentication.service';

@Injectable()
export class AdminAuthenticationService extends Authenticator{
	authenticate(username: string, password: string):boolean{
		this._isSignedIn = (username == "admin" && password == "admin");
		return this.signedIn;
	}
}


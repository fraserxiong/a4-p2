import {Injectable} from 'angular2/core';

@Injectable()
export class Authenticator{
	protected _isSignedIn: boolean = false;

	authenticate(username: string, password: string) : boolean{
		return false;
	}

	get signedIn(): boolean{
		return this._isSignedIn;
	}

	logOut(){
		this._isSignedIn = false;
	}
}
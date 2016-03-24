import { Injectable } from 'angular2/core';
import { User } from '../model/user';

@Injectable()
export class Authenticator{
	protected _isSignedIn: boolean = false;
	protected _curUser: User; 

	authenticate(username: string, password: string) : boolean{
		return false;
	}

	get signedIn(): boolean{
		return this._isSignedIn;
	}

	get curUser(): User{
		return this._curUser;
	}


	logOut(){
		this._curUser = null;
		this._isSignedIn = false;
	}
}
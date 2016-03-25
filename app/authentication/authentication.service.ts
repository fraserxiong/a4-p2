import { Injectable } from 'angular2/core';
import { User } from '../model/user';

@Injectable()
export class Authenticator{
	protected _isSignedIn: boolean = false;
	protected _curUser: User; 

	authenticate(username: string, password: string) : Promise<boolean>{
		return Promise.resolve(false);
	}

	get signedIn(): boolean{
		return this._isSignedIn;
	}

	get curUser(): User{
		return this._curUser;
	}

	protected authenticationPassed(user: User){
		this._isSignedIn = true;
		this._curUser = user;
	}


	logOut(){
		this._curUser = null;
		this._isSignedIn = false;
	}
}
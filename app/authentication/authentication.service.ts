import { Injectable } from 'angular2/core';
import { User } from '../model/user';

@Injectable()
export class Authenticator{

	authenticate(username: string, password: string) : Promise<boolean>{
		return Promise.resolve(false);
	}

	get signedIn(): boolean{
		if (typeof(Storage) === "undefined"){
			return false;
		}
		return sessionStorage.getItem('user');
	}

	get curUser(): User{
		if (typeof(Storage) === "undefined"){
			return null;
		}
		return JSON.parse(sessionStorage.getItem('user'));
	}

	protected authenticationPassed(user: User){
		if (user){
			sessionStorage.setItem('user', JSON.stringify(user));
		}
	}


	logOut(){
		sessionStorage.removeItem('user');
	}
}
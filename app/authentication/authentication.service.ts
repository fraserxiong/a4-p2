import { Injectable } from 'angular2/core';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';

export interface LoginPayload{
	errfor: Object,
	errors: Array<void>,
	password: string,
	username: string
}


@Injectable()
export abstract class Authenticator{

	abstract authenticate(username: string, password: string): Observable<string>;

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

	get user():string{
		if (typeof(Storage) === "undefined"){
			return null;
		}
		let user: User = <User>JSON.parse(sessionStorage.getItem('user'));
		if (user){
			return user.name;
		}
		return null;
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
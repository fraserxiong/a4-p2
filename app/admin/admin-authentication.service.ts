import {Injectable} from 'angular2/core';

@Injectable()
export class AdminAuthenticationService{
	authenticate(username: string, password: string):boolean{
		return (username == "admin" && password == "admin");
	}
}


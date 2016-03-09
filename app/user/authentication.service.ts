import {Injectable} from 'angular2/core';

@Injectable()
export class AuthenticationService{
	authenticate(username: string, password: string): boolean{
		return true;
	}
}
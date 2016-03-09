import {Injectable} from 'angular2/core';
import {AuthenticationService} from '../user/authentication.service';

@Injectable()
export class AdminAuthenticationService extends AuthenticationService{
	authenticate(username: string, password: string):boolean{
		return true;
	}
}


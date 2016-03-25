import {Injectable} from 'angular2/core';
import {Authenticator} from '../authentication/authentication.service';

@Injectable()
export class AdminAuthenticationService extends Authenticator{
	authenticate(username: string, password: string):Promise<boolean>{
		return Promise.resolve<boolean>(username == 'admin' && password == 'admin')
			.then<boolean>(result => {
				if (result)
					this.authenticationPassed(null);
				return result;
			});
	}
}


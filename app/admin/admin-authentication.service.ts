import { Injectable } from 'angular2/core';
import { Authenticator } from '../authentication/authentication.service';
import { UserProfileService } from '../user/user-profile.service';
import { User} from '../model/user';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdminAuthenticationService extends Authenticator{
	constructor(private _userProfileService: UserProfileService){
		super();
	}

	authenticate(username: string, password: string):Observable<string>{
		let admins: User[] = this._userProfileService.adminUsers;
		return new Promise<User>(function(resolve, reject) {
			for (var i = 0; i < admins.length; i++) {
				if ((username == admins[i].name || username == admins[i].email) && password == admins[i].password) {
					resolve(admins[i]);
				}
			}
			reject("Login Failed");
		}).then<boolean>(user => {
			if (user){
				this.authenticationPassed(user);
				return true;
			}
			return false;
		});
	}
}


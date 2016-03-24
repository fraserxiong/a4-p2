import {Injectable} from 'angular2/core';
import {User} from '../model/user';
import {UserProfileService} from './user-profile.service';
import {Authenticator} from '../authentication/authentication.service';

@Injectable()
export class UserAuthenticationService extends Authenticator{

	constructor(private _userProfileService: UserProfileService) {
		super();
	}

	authenticate(username: string, password: string): boolean {
		let users = this._userProfileService.allUsers;
		for (var i = 0; i < users.length; i++) {
			if (users[i].email == username && users[i].password == password){
				this._curUser = users[i];
				this._isSignedIn = true;
				return true;
			}
		}
		return false;
	}
}
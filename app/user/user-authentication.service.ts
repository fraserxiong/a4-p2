import {Injectable} from 'angular2/core';
import {user, user_db} from './user.service';

@Injectable()
export class UserAuthenticationService{
	private curUser: user;

	constructor(private _user_db: user_db){}

	authenticate(username: string, password: string) : boolean{
		let users = this._user_db.get_list();
		for (var i = 0; i < users.length; i++) {
			if (users[i].email == username && users[i].password == password){
				this.curUser = users[i];
				return true;
			}
		}
		return false;
	}

	getCurUser(){
		return this.curUser;
	}
}
import {Injectable} from 'angular2/core';
import {User} from '../model/user';
import {UserProfileService} from './user-profile.service';
import {Authenticator, LoginPayload} from '../authentication/authentication.service';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserAuthenticationService extends Authenticator{

	constructor(private _userProfileService: UserProfileService, private _http: Http) {
		super();
	}

	authenticate(username: string, password: string): Observable<string>{
		let loginInfo: LoginPayload = {
			errfor: {},
			errors: [],
			password: password,
			username: username
		};
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options: RequestOptions = new RequestOptions({ headers: headers });

		return this._http.post('/login/', JSON.stringify(loginInfo), options)
			.map((res: Response) => {
				let user: User = {
					name: username
				};
				this.authenticationPassed(user);
				return res.statusText;
			})
			.do((res: string) => console.log(res))
			.catch(err => {
					console.log(err);
						return Observable.throw(err.json() || "Server Error");
			})
	}
}
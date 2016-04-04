import { Injectable, Inject } from 'angular2/core';
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { Authenticator, LoginPayload } from '../authentication/authentication.service';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserAuthenticationService extends Authenticator{

	constructor(private _userProfileService: UserProfileService, @Inject(Http) private http: Http) {
		super(http);
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

		return this.http.post('/login/', JSON.stringify(loginInfo), options)
			.map((res: Response) => {
				let user: User = {
					name: username
				};
				let success: boolean = res.json().success;
				if (success)
					this.authenticationPassed(user);
				return <string> res.json().errors[0];
			})
			.do((res: string) => console.log(res))
			.catch(err => {
					console.log(err);
					return Observable.throw(err.json() || "Server Error");
			})
	}
}
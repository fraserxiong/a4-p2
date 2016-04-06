import { Injectable, Inject } from 'angular2/core';
import { User } from '../model/user';
import { Authenticator, LoginPayload } from '../authentication/authentication.service';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { UserMainService } from '../user/user-main.service';


@Injectable()
export class UserAuthenticationService extends Authenticator{

	constructor(@Inject(Http) private http: Http, 
				private _userSessionService: UserMainService) {
		super(http);
	}

	refresh(){
		this._userSessionService.user.subscribe(
				(user: User) => {this.authenticationPassed(user)},
				(err: any) => {
					sessionStorage.removeItem('user');
				}
			)
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
				return success ? 'Login Success' : <string> res.json().errors[0];
			})
			.do((res: string) => console.log(res))
			.catch(err => {
					console.log(err);
					return Observable.throw(err.json() || "Server Error");
			})
	}
}
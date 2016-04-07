import { Component } from 'angular2/core';
import { LoginForgotService } from './login-forgot.service';

@Component({
	selector: 'login-forgot',
	templateUrl: 'app/login/login-forgot.component.html',
	styleUrls: ['app/login/login-forgot.component.css'],
	providers: [LoginForgotService]
})
export class LoginForgotComponent{
	private resetMessage: boolean = false;

	constructor(private _loginForgotService: LoginForgotService){}

	onForgot(email: string){
		this._loginForgotService.forgotPassword(email)
			.subscribe(
				(success: boolean)=>{
					if (success){
						this.resetMessage = true;
					}
				},
				(err: any) => {
					window.alert('Please try again');
				}
			);
	}
}
import { Component, OnInit } from 'angular2/core';
import { ResetService } from './reset.service';
import { RouteParams, Router } from 'angular2/router';

@Component({
	selector: 'reset-pwd',
	templateUrl: 'app/login/reset.component.html',
	styleUrls: ['app/login/reset.component.css'],
	providers: [ResetService]
})
export class ResetComponent implements OnInit{
	private email: string;
	private token: string;

	constructor(private _resetService: ResetService, private _routerParams: RouteParams, private _router: Router){}

	onReset(newPwd: string, confirm: string){
		this._resetService.reset(this.email, this.token, newPwd, confirm)
			.subscribe(
				(result: boolean) => {
					if (result){
						this._router.navigate(['UserLogin']);
					}
					else{
						window.alert('Please Try again');
					}
				},
				(err: any) => {
					window.alert('An Error Occured. Please try again');
				}
			);
	}

	ngOnInit(){
		this.email = this._routerParams.get('email');
		this.token = this._routerParams.get('token');
	}
}
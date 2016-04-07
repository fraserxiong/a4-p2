import { Component, OnInit } from 'angular2/core';
import { User } from '../model/user';
import { AdminUsersService } from './admin-users.service';


@Component({
	selector: 'admin-users',
	templateUrl: 'app/admin/admin-users.component.html',
	styleUrls: [],
	providers: [AdminUsersService]
})
export class AdminUsersComponent implements OnInit{
	private users: User[];

	constructor(private _adminUsersService: AdminUsersService){}

	ngOnInit(){
		this._adminUsersService.allUsers().subscribe(
			(users: User[]) => {
				this.users = users;
			},
			(err: any) => {
				console.log('Error');
			}
		);
	}

}
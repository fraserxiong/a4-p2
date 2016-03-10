import { Component, OnInit}  from 'angular2/core';
import { ROUTER_DIRECTIVES} from 'angular2/router';

interface Link {
	name: string,
	text: string
}

@Component({
	selector: 'app-links',
	templateUrl: 'app/app-links.component.html',
	directives: [ROUTER_DIRECTIVES]
})


export class AppLinksComponent implements OnInit{
	links: Link[];

	ngOnInit(){
		this.links = [
			{
				name: 'Home',
				text: 'Home Page'
			},
			{
				name: 'UserLogin',
				text: 'User Login'
			},
			{
				name: 'Admin',
				text: 'Admin Page'
			},
			// {
			// 	name: 'Search',
			// 	text: 'Admin Login'
			// },
			// {
			// 	name: 'AdminManage',
			// 	text: 'Admin Manage'
			// }
		]
	}

}
import { Component, Input } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { User } from '../model/user';

@Component({
	selector: 'user-avatar',
	templateUrl: 'app/user/user-avatar.component.html',
	styleUrls: ['app/user/user-avatar.component.css'],
	directives: [ROUTER_DIRECTIVES]
})
export class UserAvatarComponent{
	@Input('user') curUser: User;


}
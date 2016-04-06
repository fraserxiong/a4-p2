import { Component, Input } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { User } from '../model/user';
import { DeleteFriendService } from './user-delete-friend.service';

@Component({
	selector: 'user-avatar',
	templateUrl: 'app/user/user-avatar.component.html',
	styleUrls: ['app/user/user-avatar.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers:[DeleteFriendService]
})
export class UserAvatarComponent{
	@Input('user') curUser: User;
	@Input('isfriend') isfriend: boolean;
	private deleted = false;

	constructor(
        private _deleteFriend:DeleteFriendService){}

	delete(id){
        this._deleteFriend.deletefriend(id)
            .subscribe(
                (response: string) =>{this.deleted = true;this.curUser=null},
                error => console.log(error)
                )

    }
}
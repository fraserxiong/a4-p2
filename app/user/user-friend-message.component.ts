import {Component, Input, OnInit} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "../dish/dish-overview.component";
import {UserProfileComponent} from "./user-profile.component";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserSidebarComponent } from './user-sidebar.component';
import { FriendMessageService } from './user-friend-message.service'

interface fmessage{
    user:User,
    dealed: boolean
}

@Component({
    selector: 'user-friend-message',
    templateUrl: 'app/user/user-friend-message.component.html',
    styleUrls: ['app/user/user-friend-message.component.css'],
    directives: [ROUTER_DIRECTIVES, UserProfileComponent,UserAvatarComponent,UserSidebarComponent ],
    providers:[FriendMessageService]
})
export class FriendMessageComponent implements OnInit{
    @Input('user') curUser: User;
    private curId: number;
    private friendmessages: fmessage[] = [];

    constructor(
        private _profileService: UserProfileService,
        private _routeParams: RouteParams,
        private _FriendService:FriendMessageService){}

    ngOnInit(){
        this._FriendService.friend.subscribe(
            (response: User[]) => {
                response.forEach((user: User)=>{
                    this.friendmessages.push({
                        user: user,
                        dealed : false,
                    });
                });
            },
            error => console.log(error)
            );
    }

    accept(msg){
        msg.dealed = true;

    }

    declined(msg){
        msg.dealed=true;

    }
}

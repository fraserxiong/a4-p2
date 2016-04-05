import {Component, Input, OnInit} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "../dish/dish-overview.component";
import {UserProfileComponent} from "./user-profile.component";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import { User } from '../model/user';
import { UserProfileService } from './user-profile.service';
import { UserAvatarComponent } from './user-avatar.component';
import { UserSidebarComponent } from './user-sidebar.component';
import { OrderMessageService } from './user-order-message.service'

@Component({
    selector: 'user-order-message',
    templateUrl: 'app/user/user-order-message.component.html',
    styleUrls: ['app/user/user-order-message.component.css'],
    directives: [ROUTER_DIRECTIVES, UserProfileComponent,UserAvatarComponent,UserSidebarComponent ],
    providers:[OrderMessageService]
})
export class OrderMessageComponent implements OnInit{
    @Input('user') curUser: User;
    private curId: number;
    private ordermessage= [];

    constructor(
        private _profileService: UserProfileService,
        private _routeParams: RouteParams,
        private _OrderService:OrderMessageService){}

    ngOnInit(){
        this._OrderService.ordermessage.subscribe(
            (response) => {
                this.ordermessage = response
            },
            error => console.log(error)
            );
    }

}

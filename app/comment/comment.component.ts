import { Component, Input, OnInit } from 'angular2/core';
import { Comment } from '../model/comment';
import { User } from '../model/user';
import { UserProfileService } from '../user/user-profile.service';
import { RatingComponent } from '../comment/rating.component';
import { CapitalizePipe } from '../pipe/capitalize.pipe';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
	selector: 'dish-comment',
	templateUrl: 'app/comment/comment.component.html',
	styleUrls: ['app/comment/comment.component.css'],
	directives: [RatingComponent, ROUTER_DIRECTIVES],
	pipes: [CapitalizePipe]
})
export class CommentComponent implements OnInit{
	@Input('comment') comment;

	private user: User;

	constructor(private _userProfileService: UserProfileService){}

	ngOnInit(){
		this._userProfileService.findUserById(this.comment.user_id)
			.then(user => {
				this.user = user
			});
	}
}
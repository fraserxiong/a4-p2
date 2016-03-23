import { Component, Input, OnInit } from 'angular2/core';
import { Comment } from '../model/comment';
import { User } from '../model/user';
import { UserProfileService } from '../user/user-profile.service';
import { RatingComponent } from '../comment/rating.component';

@Component({
	selector: 'dish-comment',
	templateUrl: 'app/comment/comment.component.html',
	styleUrls: ['app/comment/comment.component.css'],
	directives: [RatingComponent]
})
export class CommentComponent implements OnInit{
	@Input('comment') comment;

	private user: User;

	constructor(private _userProfileService: UserProfileService){}

	ngOnInit(){
		this.user = this._userProfileService.findUserById(this.comment.user_id);
	}
}
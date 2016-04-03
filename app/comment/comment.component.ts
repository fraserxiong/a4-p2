import { Component, Input, OnInit } from 'angular2/core';
import { Comment } from '../model/comment';
import { User } from '../model/user';
import { UserProfileService } from '../user/user-profile.service';
import { RatingComponent } from '../comment/rating.component';
import { CapitalizePipe } from '../pipe/capitalize.pipe';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { HTTP_PROVIDERS }    from 'angular2/http';

@Component({
	selector: 'dish-comment',
	templateUrl: 'app/comment/comment.component.html',
	styleUrls: ['app/comment/comment.component.css'],
	directives: [RatingComponent, ROUTER_DIRECTIVES],
	pipes: [CapitalizePipe]
})
export class CommentComponent implements OnInit{
	@Input('comment') comment;
	@Input('onDelete') onDelete;

	private user: User;

	constructor(private _userProfileService: UserProfileService){}

	ngOnInit(){
		console.log(this.comment);
		this._userProfileService.findUserAvatarById(this.comment.user)
			.then(user => {
				this.user = user
			});
	}

	delete(){
		this.onDelete(this.comment._id);
	}
}

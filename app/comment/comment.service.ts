import { Comment } from '../model/comment';
import { Injectable } from 'angular2/core';

@Injectable()
export class CommentService{
	getCommentForDish(id: number): Promise<Comment[]>{
		let comments: Comment[] = [
			{
				id: 1,
				target_id: id,
				user_id: 10000,
				rating: 5,
				message: "Best burger that I have ever tried! Highly recommended.",
				date: "March 10, 2016",
			},
			{
				id: 2,
				target_id: id,
				user_id: 10003,
				rating: 4,
				message: "Warning: makes you sleepy! Can't moonwalk!",
				date: "March 8, 2016",
			},
			{
				id: 3,
				target_id: id,
				user_id: 10005,
				rating: 5,
				message: "Full of energy!",
				date: "March 7, 2016",
			}
		];

		return Promise.resolve<Comment[]>(comments);
	}
}
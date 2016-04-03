export interface Comment {
	target_id: number; //Id of the dish towards which this comment targets
	user_id: number; //Id of the user who posts this comment
	reply_to?: number; //Id of the comment to which this comment reply
	rating: number;
	message?: string;
	date: string;
	_id: string;
	deletable: boolean;
}

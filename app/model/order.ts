import {Dish} from './dish';
import {User} from './user';

export class Order{
	private _id: string;
	user: User;
	dishes: {dish: Dish, quantity: number}[];

	constructor(user?: User){
		if (user) {
			this.user = user;
		}
		this.dishes = [];
	}

	addDish(dish: Dish, quantity: number = 1){
		quantity = quantity < 1 ? 1 : quantity;

		let dishExist: number = -1;
		for (var i = 0; i < this.dishes.length; i++){
			if (this.dishes[i].dish.id == dish.id){
				dishExist = i;
				break;
			}
		}
		if (dishExist > -1) {
			this.dishes[i].quantity = quantity;
		}
		else {
			this.dishes.push({ dish: dish, quantity: quantity });
		}
	}

	removeDish(dish: Dish){
		for (var i = this.dishes.length-1; i >= 0; i--){
			console.log("examining: " + i);
			if (this.dishes[i].dish.id == dish.id){
				this.dishes.splice(i, 1);
			}
		}
	}

	set id(id: string){
		if (!this._id){
			this._id = id;
		}
	}
}
import {Dish} from './dish';
import {User} from './user';

export class Order{
	private _id: string;
	user: User;
	dishes: {dish: Dish, quantity: number}[];

	constructor(user: User){
		this.user = user;
		this.dishes = [];
	}

	addDish(dish: Dish, quantity: number = 1){
		quantity = quantity < 1 ? 1 : quantity;
		this.dishes.push({ dish: dish, quantity: quantity });
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
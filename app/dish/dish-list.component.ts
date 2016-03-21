import {Component, Input} from "angular2/core";
import {Dish} from "../model/dish";
import {DishOverviewComponent} from "./dish-overview.component";

@Component({
	selector: 'dish-list',
	templateUrl: 'app/dish/dish-list.component.html',
	styleUrls: ['app/dish/dish-list.component.css'],
	directives: [DishOverviewComponent],
})
export class DishListComponent{
	@Input('dishes') dishes: Dish[];
}
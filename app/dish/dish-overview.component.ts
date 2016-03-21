import {Component, Input} from "angular2/core";
import {Dish} from "../model/dish";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
	selector: "dish-overview",
	templateUrl: 'app/dish/dish-overview.component.html',
	styleUrls: ['app/dish/dish-overview.component.css'],
	directives: [ROUTER_DIRECTIVES]
})
export class DishOverviewComponent{
	@Input('dish') dish: Dish;
}
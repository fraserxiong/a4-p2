import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { Dish } from '../model/dish';
import { CapitalizePipe } from '../pipe/capitalize.pipe';

@Component({
	selector: 'order-dishitem',
	templateUrl: 'app/order/order-dishitem.component.html',
	styleUrls: ['app/order/order-dishitem.component.css'],
	pipes: [CapitalizePipe]
})
export class OrderDishItemComponent{
	@Input('dish') dish: Dish;
	@Input('quantity') quantity: number;

	@Output('increment') incrementQuantity: EventEmitter<void> = new EventEmitter<void>();
	@Output('decrement') decrementQuantity: EventEmitter<void> = new EventEmitter<void>();
	@Output('remove') removeItem: EventEmitter<void> = new EventEmitter<void>();

	private remove():void{
		this.removeItem.emit(null);
	}
}
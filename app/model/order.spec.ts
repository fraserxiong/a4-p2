import { Order } from './order';
import { Dish } from './dish';

describe('Order Model', ()=>{
	let dish: Dish = {
		id: 1,
		url: 'http://a.b'
	};

	let dish2: Dish = {
		id: 2,
		url: 'http://c.d'
	}

	let order: Order;

	beforeEach(()=>{
		order = new Order();
	})

	it('Guard against null', ()=>{
		order.addDish(null, 3);
		expect(0).toEqual(order.dishes.length);
	});

	it ('Guard against negative quantity', ()=>{
		order.addDish(dish, -1);
		expect(order.dishes[0].quantity).toEqual(1);
	})

	it('Add same dish more than once will overwrite', ()=>{
		order.addDish(dish, 2);
		order.addDish(dish, 3);
		expect(order.dishes.length).toEqual(1);
		expect(order.dishes[0].quantity).toEqual(3);
	})

	it('Add two dishes', ()=>{
		order.addDish(dish, 3);
		order.addDish(dish2, 1);
		expect(order.dishes.length).toEqual(2);
		expect(order.dishes[0].dish).toEqual(dish);
		expect(order.dishes[1].dish).toEqual(dish2);
		expect(order.dishes[0].quantity).toEqual(3);
		expect(order.dishes[1].quantity).toEqual(1);
	})

	it('Remove dish from empty order', ()=>{
		order.removeDish(dish);
		expect(order.dishes.length).toEqual(0);
	})

	it('Remove dish from one-item order', ()=>{
		order.addDish(dish, 3);
		order.removeDish(dish);
		expect(order.dishes.length).toEqual(0);
	})

	it('Remove dish from multi-item order', ()=>{
		order.addDish(dish, 3);
		order.addDish(dish2, 1);
		order.removeDish(dish);
		expect(order.dishes.length).toEqual(1);
		expect(order.dishes[0].dish).toEqual(dish2);
	})
});
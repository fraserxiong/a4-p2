import { describe, it, expect, inject, injectAsync, beforeEach, beforeEachProviders} from 'angular2/testing';
import { HTTP_PROVIDERS, Http, Response, BaseRequestOptions, Headers} from 'angular2/http';
import { MockBackend} from 'angular2/http/testing';
import { provide} from 'angular2/core';
import { OrderService} from './order.service';
import { Dish} from '../model/dish';
import 'rxjs/Rx';

describe('Service: Order Service', ()=>{
	let mockbackend: MockBackend, service: OrderService;

	beforeEachProviders(() => [
		MockBackend,
		BaseRequestOptions,
		provide(Http, {
			useFactory: (backend, options) => new Http(backend, options),
			deps: [MockBackend, BaseRequestOptions]
		}),
		OrderService,
	]);

	beforeEach(inject([MockBackend, OrderService], (_mockbackend, _service) => {
		mockbackend = _mockbackend;
		service = _service;
	}));

	it('contains empty order', () => {
		expect(service.order).not.toEqual(null);
	});

	it('calculates total', () => {
		let dish: Dish = {
			id: 1,
			url: 'stub',
			price: 20,
		}
		let dish2: Dish = {
			id: 2,
			url: 'stub',
			price: 10,
		}
		service.add(dish, 2);
		service.add(dish2, 3);
		expect(service.total).toEqual(dish.price * 2 + dish2.price * 3);
	});

	it('will not submit empty order', done=>{
		service.saveOrder().subscribe(
			() => { fail('Should not success')},
			()=> {
				expect(true).toEqual(true);
				done();
			},
			()=>{done()}
		);
	})

	it('will assign id after successful submit', done => {
		mockbackend.connections.subscribe(connection => {
			connection.mockRespond(new Response({ body: JSON.stringify({'_id': 20})}));
		});
		let dish: Dish = {
			id: 1,
			url: 'stub',
			price: 20,
		}
		service.add(dish, 1);
		service.saveOrder().subscribe(
			(success) => {
				expect(service.order.id).toEqual(20);
				done();
			},
			(err) => {
				console.log(err);
				fail('Should not fail');
				done();
			},
			() => {
				done();
			})
	});
});
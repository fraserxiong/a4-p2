import { beforeEach, beforeEachProviders, describe, expect, it, inject, injectAsync, setBaseTestProviders, TestComponentBuilder, ComponentFixture} from 'angular2/testing';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS, Http, Response, BaseRequestOptions, Headers} from 'angular2/http';
import { MockBackend} from 'angular2/http/testing';
import { TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS} from 'angular2/platform/testing/browser';
import { OrderSidebarComponent } from './order-sidebar.component';
import { OrderService} from './order.service';
import { Router, Location, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { RouteRegistry} from 'angular2/src/router/route_registry';
import { SpyLocation} from 'angular2/src/mock/location_mock';
import { RootRouter} from 'angular2/src/router/router';
import { AppRouterComponent } from '../app-router.component';
import { Dish } from '../model/dish';

describe('Order Sidebar', ()=>{
	let tcb: TestComponentBuilder;
	let orderService: OrderService;

	beforeEachProviders(()=>[
		TestComponentBuilder,
		OrderSidebarComponent,
		MockBackend,
		BaseRequestOptions,
		provide(Http, {
			useFactory: (backend, options) => new Http(backend, options),
			deps: [MockBackend, BaseRequestOptions]
		}),
		OrderService,
		RouteRegistry,
		provide(Location, {useClass: SpyLocation}),
		provide(Router, { useClass: RootRouter }),
		provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppRouterComponent}),
	]);

	beforeEach(inject([TestComponentBuilder, MockBackend, OrderService, Router], (_tcb, _mockBackend, _orderService, _router) => {
		tcb = _tcb;
		orderService = _orderService;
	}));

	it('Checkout Button Should be Disabled When Initialized', done => {
		tcb.createAsync(OrderSidebarComponent).then((fixture: ComponentFixture) => {
			let sideBar: OrderSidebarComponent = fixture.componentInstance;
			let element = fixture.nativeElement;
			fixture.detectChanges();
			expect(element.querySelectorAll('button.checkout').length).toEqual(1);
			expect(element.querySelectorAll('button.checkout')[0].disabled).toEqual(true);
			done();
		})
			.catch(e => done.fail(e));
	});

	it('Dish list should change with service', done => {
		tcb.createAsync(OrderSidebarComponent).then((fixture: ComponentFixture) => {
			let sideBar: OrderSidebarComponent = fixture.componentInstance;
			let element = fixture.nativeElement;
			let dish: Dish = {
				id: 1,
				url: 'stub',
				price: 20
			};
			let dish2: Dish = {
				id: 2,
				url: 'stub',
				price: 30
			};
			orderService.add(dish, 3);
			orderService.add(dish2, 2);
			fixture.detectChanges();
			expect(element.querySelectorAll('order-dishitem').length).toEqual(2);
			done();
		})
			.catch(e => done.fail(e));
	});

	it('Checkout Button Enabled After Adding Dishes', done => {
		tcb.createAsync(OrderSidebarComponent).then((fixture: ComponentFixture) => {
			let sideBar: OrderSidebarComponent = fixture.componentInstance;
			let element = fixture.nativeElement;
			let dish: Dish = {
				id: 1,
				url: 'stub',
				price: 20
			};
			let dish2: Dish = {
				id: 2,
				url: 'stub',
				price: 30
			};
			orderService.add(dish, 3);
			orderService.add(dish2, 2);
			fixture.detectChanges();
			expect(element.querySelectorAll('button.checkout').length).toEqual(1);
			expect(element.querySelectorAll('button.checkout')[0].disabled).toEqual(false);
			done();
		})
			.catch(e => done.fail(e));
	});
})


import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';
import { OrderCheckoutComponent } from './order-checkout.component';

@Component({
	selector: 'order-main',
	template: '<router-outlet></router-outlet>',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig(
	[
		{
			path: '/checkout',
			name: 'CheckOut',
			component: OrderCheckoutComponent
		},
	]
)
export class OrderMainComponent{}
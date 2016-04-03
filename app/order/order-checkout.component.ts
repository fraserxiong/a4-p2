import { Component, OnInit } from 'angular2/core';
import { OrderService } from './order.service';
import { UserMainService } from '../user/user-main.service';
import { User } from '../model/user';
import { PaymentMethod } from './order-payment.model';

interface PaymentDescription{
	paymentMethod: PaymentMethod,
	paymentDescription: string
}

@Component({
	selector: 'order-checkout',
	templateUrl: 'app/order/order-checkout.component.html',
	styleUrls: ['app/order/order-checkout.component.css'],
})
export class OrderCheckoutComponent implements OnInit{
	private user: User;

	private paymentMethods = PaymentMethod;
	private paymentMethodsArray: PaymentDescription[] = []; 
	private selectedPaymentMethod: PaymentMethod = -1;

	private submitted = false;

	constructor(private _orderService: OrderService,
				private _userService: UserMainService){}

	ngOnInit(){
		this._userService.user.subscribe(
			(curUser: User) => this.user = curUser,
			(error: any) => console.log('error: ' + error)
			);
		for (var i = 0; i < PaymentMethod.COUNT; i++){
			var paymentDes: PaymentDescription = {
				paymentMethod: i,
				paymentDescription: i == 0? 'Credit Card/Paypal' : 'Cash (Upon Delivery)'
			}
			this.paymentMethodsArray.push(paymentDes);
		}
	}

	submitOrder(address: string){
		this.submitted = true;
		if (this.selectedPaymentMethod >= 0) {
			this._orderService.setOrderAddrss(address);
			this._orderService.saveOrder()
				.subscribe(
					(successMessage: string) => {
						console.log(successMessage);
						window.alert(successMessage);
					},
					(error: any) => {
						console.log('Error: ' + error);
						window.alert(error);
					}
					);
		}
	}
}
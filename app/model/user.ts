import {CreditCard} from './credit-card';

export interface User{
	id?: number;
	name?: string;
	first_name?:string;
	last_name?:string;
	middle_name?:string;
	email?: string;
	password?: string;
	phone_number?: string;
	address?: string;
	postcode?: string;
    avatar_url?: string;
	payment_info?: CreditCard[];
	friends?: number[];
	isAdmin?: boolean;
}
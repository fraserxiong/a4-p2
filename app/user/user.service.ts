import {Injectable} from 'angular2/core';

export interface credit_card {
	card_number: number;
	name: string;
	cvd: string;
	expire_date: string;
}

export interface user {
	id: number;
	name: string;
	email: string;
	password: string;
	phone_number: string;
	address: string;
	postcode: string;
  avatar_url: string;
	payment_info: credit_card[];
}

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

public user: user_list[] = [{
	id:10000,
	name: "Bill Gates",
	email: "gates.bill@gmail.com",
	password:"lalala",
	phone_number:"647-123-8897",
	address: "1000-777 bay street",
	postcode:"M5G3K5"
	avatar_url:"../../images/user10000.jpg",
	payment_info: [{card_number: 4510155024895234,
					name: "Bill Gates",
					cvd: "001",
					expire_date: "04/17"}]
	},{

	id:10001,
	name: "Peter Pan",
	email: "Peter.Pan@hotmail.com",
	password:"idonotknow",
	phone_number:"647-312-8397",
	address: "0918-33 bay street",
	postcode:"M3G4M5"
	avatar_url:"../../images/user10001.jpg",
	payment_info: [{card_number: 4510677824895234,
					name: "Peter Pan",
					cvd: "015",
					expire_date: "09/16"}]
	},{

	id:10002,
	name: "Bruce Willis",
	email: "Willis123@hotmail.com",
	password:"guessguess",
	phone_number:"416-312-4196",
	address: "1101-763 bay street",
	postcode:"M5G2M5"
	avatar_url:"../../images/user10002.jpg",
	payment_info: [{card_number: 4510907824899876,
					name: "Bruce Willis",
					cvd: "098",
					expire_date: "10/16"}]
	},{

	id:10003,
	name: "Michael Jackson",
	email: "ilovejackson@gmail.com",
	password:"590813jm",
	phone_number:"647-881-8796",
	address: "912-1001 bay street",
	postcode:"M5G2M9"
	avatar_url:"../../images/user10003.jpg",
	payment_info: [{card_number: 4510999024899778,
					name: "Michael Jackson",
					cvd: "001",
					expire_date: "11/20"}]
	},{

	id:10004,
	name: "Michael Jordan",
	email: "jordanbest@gmail.com",
	password:"123456jd",
	phone_number:"647-881-8796",
	address: "912-1001 bay street",
	postcode:"M5G2M9"
	avatar_url:"../../images/user10004.jpg",
	payment_info: [{card_number: 4510999024892228,
					name: "Michael Jordan",
					cvd: "005",
					expire_date: "11/17"}]
	},{

	id:10005,
	name: "James Bond",
	email: "bond007@gmail.com",
	password:"im007imbond",
	phone_number:"647-731-5301",
	address: "918-1000 bay street",
	postcode:"M5G2M9"
	avatar_url:"../../images/user10005.jpg",
	payment_info: [{card_number: 4510999056981111,
					name: "James Bond",
					cvd: "007",
					expire_date: "12/17"}]
	},{

	id:10006,
	name: "Kobe Bryant",
	email: "kobekobe@hotmail.com",
	password:"mvpkobe",
	phone_number:"416-447-6631",
	address: "1001-38 elm street",
	postcode:"M5G2M5"
	avatar_url:"../../images/user10006.jpg",
	payment_info: [{card_number: 4510115688902276,
					name: "Kobe Bryant",
					cvd: "024",
					expire_date: "12/18"}]
	},{

	id:10007,
	name: "Lebron James",
	email: "James023@hotmail.com",
	password:"mvpjames",
	phone_number:"647-631-5531",
	address: "2810-38 elm street",
	postcode:"M5G2M5"
	avatar_url:"../../images/user10007.jpg",
	payment_info: [{card_number: 4510115688903398,
					name: "Lebron James",
					cvd: "023",
					expire_date: "12/19"}]

	},{

	id:10008,
	name: "Bingbing Fan",
	email: "Fanfan@gmail.com",
	password:"fanyejiushiwo",
	phone_number:"647-337-5561",
	address: "1102-777 bay street",
	postcode:"M5G2M9"
	avatar_url:"../../images/user10008.jpg",
	payment_info: [{card_number: 4510115998909980,
					name: "Bingbing Fan",
					cvd: "001",
					expire_date: "01/18"}]

}]

export interface Dish{
	id: number;
	url: string;
	name?: string;
	location?: string;
	description?: string;
	categories?: string[];
	price?: number;
}
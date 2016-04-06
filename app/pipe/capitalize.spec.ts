import { CapitalizePipe } from './capitalize.pipe';

describe('Capitalize Pipe', ()=>{
	let pipe: CapitalizePipe;

	beforeEach(() => {
		pipe = new CapitalizePipe();
	});

	it('transforms "hello world" to "Hello World"', () => {
		expect(pipe.transform("hello world")).toEqual('Hello World');
	});

	it ('keep "Hello World"', ()=>{
		expect(pipe.transform('Hello World')).toEqual('Hello World');
	});
})
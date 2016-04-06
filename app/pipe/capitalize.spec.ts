import { CapitalizePipe } from './capitalize.pipe';

describe('Capitalize Pipe', ()=>{
	let pipe: CapitalizePipe;

	beforeEach(() => {
		pipe = new CapitalizePipe();
	});

	it ("guard against null", ()=>{
		expect(pipe.transform(null)).toEqual(undefined);
	});

	it ('transform one word', ()=>{
		expect(pipe.transform('ok')).toEqual('Ok');
	})

	it('transforms "hello world" to "Hello World" (multiword)', () => {
		expect(pipe.transform("hello world")).toEqual('Hello World');
	});

	it ('keep "Hello World"', ()=>{
		expect(pipe.transform('Hello World')).toEqual('Hello World');
	});
})
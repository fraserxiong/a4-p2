import { beforeEach, beforeEachProviders, describe, expect, it, inject, injectAsync, setBaseTestProviders, TestComponentBuilder, ComponentFixture} from 'angular2/testing';
import { provide } from 'angular2/core';
import { TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS} from 'angular2/platform/testing/browser';
import { RatingComponent } from './rating.component';

setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

describe('Rating Component', ()=>{
	it('Render 3 stars', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
		return tcb.createAsync(RatingComponent).then((componentFixture: ComponentFixture) => {
			const element = componentFixture.nativeElement;
			componentFixture.componentInstance.rate = 3;
			componentFixture.detectChanges();
			expect(element.querySelectorAll("button.btn-warning").length).toEqual(3);
		})
	}));

	it('Render negative stars', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
		return tcb.createAsync(RatingComponent).then((componentFixture: ComponentFixture) => {
			const element = componentFixture.nativeElement;
			componentFixture.componentInstance.rate = -1;
			componentFixture.detectChanges();
			expect(element.querySelectorAll("button.btn-warning").length).toEqual(0);
		})
	}));
});
import { beforeEach, beforeEachProviders, describe, expect, it, inject, injectAsync, setBaseTestProviders, TestComponentBuilder, ComponentFixture} from 'angular2/testing';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS, Http, Response, BaseRequestOptions, Headers} from 'angular2/http';
import { MockBackend} from 'angular2/http/testing';
import { Router, Location, ROUTER_PRIMARY_COMPONENT } from 'angular2/router';
import { RouteRegistry} from 'angular2/src/router/route_registry';
import { SpyLocation} from 'angular2/src/mock/location_mock';
import { RootRouter} from 'angular2/src/router/router';
import { AppRouterComponent } from '../app-router.component';
import { AppHeaderComponent } from './app-header.component';
import { Authenticator } from '../authentication/authentication.service';
import { UserAuthenticationService } from '../user/user-authentication.service';
import { UserMainService } from '../user/user-main.service';

describe('Header Logged In, Logged Out State', ()=>{
	let tcb: TestComponentBuilder;
	let mockBackend: MockBackend;
	let authenticator: Authenticator;

	beforeEachProviders(() => [
		TestComponentBuilder,
		AppHeaderComponent,
		MockBackend,
		BaseRequestOptions,
		provide(Http, {
			useFactory: (backend, options) => new Http(backend, options),
			deps: [MockBackend, BaseRequestOptions]
		}),
		provide(Authenticator, { useClass: UserAuthenticationService }),
		UserMainService,
		RouteRegistry,
		provide(Location, { useClass: SpyLocation }),
		provide(Router, { useClass: RootRouter }),
		provide(ROUTER_PRIMARY_COMPONENT, { useValue: AppRouterComponent }),
	]);

	beforeEach(inject([TestComponentBuilder, MockBackend, Authenticator], (_tcb: TestComponentBuilder, _mockBackend, _authenticator) => {
		tcb = _tcb;
		mockBackend = _mockBackend;
		authenticator = _authenticator;
	}));

	it('Showing Not Logged In Block When Initialized', done => {
		tcb.createAsync(AppHeaderComponent).then((fixture: ComponentFixture) => {
			let header: AppHeaderComponent = fixture.componentInstance;
			let element = fixture.nativeElement;
			fixture.detectChanges();
			expect(element.querySelectorAll('#not-signed-in-block').length).toEqual(1);
			expect(element.querySelectorAll('#signed-in-block').length).toEqual(0);
			done();
		}).catch((reason) => {
			done.fail(reason);
		});
	});

	it('Showing Logout block after Logging in', done=>{
		mockBackend.connections.subscribe(connection => {
			connection.mockRespond(new Response({ body: JSON.stringify({ 'success': true }) }));
		});
		tcb.createAsync(AppHeaderComponent).then((fixture: ComponentFixture) => {
			let header: AppHeaderComponent = fixture.componentInstance;
			let element = fixture.nativeElement;
			authenticator.authenticate('a', 'b')
				.subscribe(
					(message)=>{
						console.log(message);
						header.curUser = authenticator.curUser.name;
						fixture.detectChanges();
						expect(element.querySelectorAll('#not-signed-in-block').length).toEqual(0);
						expect(element.querySelectorAll('#signed-in-block').length).toEqual(1);
						done();
					},
					() => {
						done.fail('login failed');
					}
				);
		}).catch((reason) => {
			done.fail(reason);
		})
	})

	it('Cart toggle opens cart', done=>{
		tcb.createAsync(AppHeaderComponent).then((fixture: ComponentFixture) => {
			let header: AppHeaderComponent = fixture.componentInstance;
			header.cartOpen = false;
			header.cartToggle.subscribe(x => {
				expect(x).toEqual(true);
				done();
			});
			header.toggleCart(true);
		}).catch((error) => { 
			done.fail(error); 
		});
	})

	it('Double Click Cart toggle closes cart', done => {
		tcb.createAsync(AppHeaderComponent).then((fixture: ComponentFixture) => {
			let header: AppHeaderComponent = fixture.componentInstance;
			header.cartOpen = false;
			header.toggleCart(true);
			header.cartToggle.subscribe(x => {
				expect(x).toEqual(false);
				done();
			});
			header.toggleCart(true);
		}).catch((error) => {
			done.fail(error);
		});
	})
})
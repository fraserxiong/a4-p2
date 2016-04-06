import { describe, it, expect, inject, injectAsync, beforeEach, beforeEachProviders} from 'angular2/testing';
import { HTTP_PROVIDERS, Http, Response, BaseRequestOptions, Headers} from 'angular2/http';
import { MockBackend} from 'angular2/http/testing';
import { provide} from 'angular2/core';

import { UserAuthenticationService } from './user-authentication.service';
import { UserMainService } from './user-main.service';

describe('User Authentication Service', ()=>{
	let mockBackend: MockBackend;
	let userAuthService: UserAuthenticationService;

	beforeEachProviders(() => [
		MockBackend,
			BaseRequestOptions,
			provide(Http, {
				useFactory: (backend, options) => new Http(backend, options),
				deps: [MockBackend, BaseRequestOptions]
			}),
			UserMainService,
			UserAuthenticationService,
	]);

	beforeEach(inject([MockBackend, UserAuthenticationService], (_mockBack, _userAuth) => {
		mockBackend = _mockBack;
		userAuthService = _userAuth;
		sessionStorage.removeItem('user');
	}));

	it('Not Signed In When Initialized', ()=>{
		expect(userAuthService.signedIn).toEqual(false);
	})

	it("Incorrect Credential won't change signed in state", done => {
		mockBackend.connections.subscribe(connection => {
			connection.mockRespond(new Response({ body: JSON.stringify({ 'success': false, 'errors': ['Invalid'] }) }));
		});
		userAuthService.authenticate('a', 'b')
			.subscribe(
				() => {
					expect(userAuthService.signedIn).toEqual(false);
					done();
				},
				() => {
					done.fail('Should Not Be Failing');
				},
				() => {
					done();
				}
			);
	});

	it('Correct Credential Will Change Signed In State to true and Store User name in session Storage', done => {
		mockBackend.connections.subscribe(connection => {
			connection.mockRespond(new Response({ body: JSON.stringify({ 'success': true }) }));
		});
		userAuthService.authenticate('a', 'b')
			.subscribe(
				()=>{
					expect(userAuthService.signedIn).toEqual(true);
					expect(userAuthService.curUser.name).toEqual('a');
					done();
				},
				() => {
					done.fail('Should Not Be failing');
				},
				() => {
					done();
				}
			);
	});

	it('Logout will change state to not signed in and remove user in session storage', done=>{
		mockBackend.connections.subscribe(connection => {
			connection.mockRespond(new Response({ body: JSON.stringify({ 'success': true }) }));
		});
		userAuthService.authenticate('a', 'b')
			.subscribe(
			() => {
				expect(userAuthService.signedIn).toEqual(true);
				expect(userAuthService.curUser.name).toEqual('a');

				userAuthService.logOut()
				.subscribe(
					()=>{
						expect(userAuthService.signedIn).toEqual(false);
						expect(userAuthService.curUser).toEqual(null);
						done();
					},
					()=>{
						done.fail('Logout failed');
					}
				)
			},
			() => {
				done.fail('Should Not Be failing');
			},
			() => {
				done();
			}
		);
	});
})
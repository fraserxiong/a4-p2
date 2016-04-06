import {beforeEach, beforeEachProviders, describe, expect, it, inject, injectAsync, setBaseTestProviders} from 'angular2/testing';
import {provide} from 'angular2/core';
import {CommentService} from './comment.service';
import {TEST_BROWSER_APPLICATION_PROVIDERS, TEST_BROWSER_PLATFORM_PROVIDERS} from 'angular2/platform/testing/browser';

setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS);

describe('comment service', ()=>{
	beforeEachProviders(()=>{
		return [CommentService]
	})
})
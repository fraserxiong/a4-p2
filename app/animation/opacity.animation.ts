import { Directive, ElementRef } from 'angular2/core';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { Animation } from 'angular2/src/animate/animation';

@Directive({
	selector: '[opacity-animator]',
	exportAs: 'opa-animator'
})
export class OpacityAnimator{

	constructor(private _animationBuilder: AnimationBuilder, private _el: ElementRef){}

	toggle(isVisible: boolean = false){
		let animation = this._animationBuilder.css();
		animation.setDuration(500);

		if (!isVisible){
			animation.setFromStyles({ opacity: '1' })
				.setToStyles({ opacity: '0' });
		}
		else{
			animation.setFromStyles({ opacity: '0'})
				.setToStyles({ opacity: '1' });
		}
		animation.start(this._el.nativeElement);
	}
}
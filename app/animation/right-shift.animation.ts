import { Directive, ElementRef } from 'angular2/core';
import { AnimationBuilder } from 'angular2/src/animate/animation_builder';
import { Animation } from 'angular2/src/animate/animation';

@Directive({
	selector: '[slide-right]',
	exportAs: 'slide-pane'
})
export class RightShiftAnimator{
	constructor(private _animationBuilder: AnimationBuilder, private _el: ElementRef){}

	toggle(isVisible: boolean){
		let animBuilder = this._animationBuilder.css();
		animBuilder.setDuration(500);
		if (isVisible){
			animBuilder.setFromStyles({ right: '-100%' })
				.setToStyles({ right: '0' });
		}
		else{
			animBuilder.setFromStyles({ right: '0' })
				.setToStyles({ right: '-100%' });
		}
		animBuilder.start(this._el.nativeElement);
	}
}
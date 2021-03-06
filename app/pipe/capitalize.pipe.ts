import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'Capitalize'})
export class CapitalizePipe implements PipeTransform{
	transform(value: string) : string{
		if (value)
			return value.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	}
}
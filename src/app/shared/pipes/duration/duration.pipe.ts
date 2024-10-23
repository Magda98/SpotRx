import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration',
	standalone: true,
})
export class DurationPipe implements PipeTransform {
	transform(duration: number): string {
		const tempDuration = duration / 1000;
		const m = Math.floor(tempDuration / 60);
		const s = Math.floor(tempDuration % 60);

		const durationString = s < 10 ? `${m}:0${s}` : `${m}:${s}`;
		return durationString;
	}
}

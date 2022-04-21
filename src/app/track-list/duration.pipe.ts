import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {
    const temp = duration / (1000);
    const m = Math.floor(temp / 60);
    const s = Math.floor((temp % 60));
    
    const durationString = s < 10? `${m}:0${s}` : `${m}:${s}`
    return durationString;
  }

}

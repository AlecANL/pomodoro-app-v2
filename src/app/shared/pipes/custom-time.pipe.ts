import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTime',
})
export class CustomTime implements PipeTransform {
  transform(time: number) {
    const minutes = ('0' + Math.floor(time / 60)).slice(-2);
    const seconds = ('0' + Math.floor(time % 60)).slice(-2);
    return `${minutes}:${seconds}`;
  }
}

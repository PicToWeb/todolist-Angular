import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority',
  standalone: true
})
export class PriorityPipe implements PipeTransform {

  transform(value: "low" | "middle" | "high"): string {
    if(!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}

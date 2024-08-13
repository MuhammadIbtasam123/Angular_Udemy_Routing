import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseShort',
  standalone: true
})
export class CoursePipe implements PipeTransform {

  transform(str: string, length: number): unknown {
    return str.substring(0,length);
  }

}

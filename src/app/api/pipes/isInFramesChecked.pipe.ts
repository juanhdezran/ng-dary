import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'isInFramesChecked'
})
export class IsInFramesChecked implements PipeTransform {
  transform(items: any[]): any[] {
    if(!items) return [];         
    return items.filter( it => {
      return it.checked == true;
    });    
   }
}
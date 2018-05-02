import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'isInFramesChecked'
})
export class IsInFramesChecked implements PipeTransform {
  transform(items: any[], model: string): boolean {
    if(!items) return false;
    if(!model) return false;        
    items = items.filter( it => {
      return it.model === model;
    });
    if(items.length > 0){
        return true;
    }
    return false;
   }
}
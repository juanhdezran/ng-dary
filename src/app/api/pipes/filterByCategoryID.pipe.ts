import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filterByCategoryID'
})
export class FilterByCategoryID implements PipeTransform {
  transform(items: any[], id: number): any[] {
    if(!items) return [];
    if(!id) return items;        
    return items.filter( it => {
      return it.category === id;
    });
   }
}
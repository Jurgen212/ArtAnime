import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Soon'
})
export class SoonPipe implements PipeTransform {

  transform( coleccion: string): string {
    
    if( coleccion == "Cooming soon"){
      return "Cooming soon"
    }
    return ""

  }

}

import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'disponibles'
})
export class disponiblesPipe implements PipeTransform{

    transform( number: number ):string {
        
        if( number == 0 ){
            return "No disponible";
        }
        else{
            return "Disponible";
        }
    }
}
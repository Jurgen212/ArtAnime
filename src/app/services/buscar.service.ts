import { Injectable } from '@angular/core';
import { StockService } from './stock.service';
import { funko } from '../interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  constructor( private stockServ: StockService, private router: Router ) { }


  path_funko: string = "";
  funko_seleccionado!: funko[];
  arreglo_informacion: any = [];

  mostrarFunko( id: string, path: string ){

    
    this.stockServ.getFunkoById(  id  )
    .subscribe( data => {
      
      this.funko_seleccionado = data;
      this.path_funko = path;
      
      this.router.navigate(['/home/caracteristicas']);
    });

  }


  getFunko(){
    if( this.path_funko != ""){
      
      this.arreglo_informacion = [ this.funko_seleccionado[0], this.path_funko ];
      return this.arreglo_informacion;

    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { funko } from '../../interface';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { BuscarService } from '../../services/buscar.service';





@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})


export class TarjetasComponent implements OnInit {

  @Input() personajes : funko[];

  productos : funko[] = [];
  imagenes  : string = "";



  ponerImagenFondoaTarjeta( index: number): string{

    let i = JSON.parse( `${index}` );

    if( this.productos[i].coleccion == "Agua"){
      return "assets/fondos-tarjetas/tarjeta-agua.png";
    }
    else if( this.productos[i].coleccion == "Tierra"){
      
      return "assets/fondos-tarjetas/tarjeta-tierra.png";
    }
    else if( this.productos[i].coleccion == "Aire"){
      return "assets/fondos-tarjetas/tarjeta-aire.png";
    }
    else{
      return "assets/fondos-tarjetas/tarjeta-cooming.png";
    }
    
  };


  constructor( private stockServ: StockService, private router: Router, private buscar: BuscarService ) {
    this.personajes = [];
   }

  ngOnInit(): void {
   
    
    for( let i = 0; i < this.personajes.length; i++){
      
      //Esconde productos de coleccion 0
      if( this.personajes[i].stock <= 0){

        this.personajes[i].coleccion = "oculta";
        this.stockServ.putFunko( this.personajes[i], this.personajes[i]._id )
        .subscribe( data => data);
      }

      if( this.personajes[i].coleccion != "oculta"){
        this.productos.push( this.personajes[i] ) ;
        
      }
      
    }
  }

  consola( index: number ){

    this.buscar.mostrarFunko( this.productos[index].name, this.router.url );
  }


  conocerSiHayDescuento( index: number ): boolean{

    if( this.productos[index].promo != 0 &&  this.productos[index].promo != null ) return true;
    else return false;
  }

}

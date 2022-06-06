import { Component, OnInit } from '@angular/core';
import { funko } from 'src/app/interface';
import { StockService } from 'src/app/services/stock.service';
import { Route, Router } from '@angular/router';
import { BuscarService } from 'src/app/services/buscar.service';

@Component({
  selector: 'app-aire',
  templateUrl: './aire.component.html',
  styleUrls: ['./aire.component.css']
})
export class AireComponent implements OnInit {

  
  respuesta: funko[] = [];

  constructor( private stockServ: StockService, private router: Router, private buscar: BuscarService ) { }

  funkos_aire: funko[] = [];

  ngOnInit(): void {

    this.stockServ.getAllFunkos()
    .subscribe(
      data =>{

        this.respuesta = data;

        for( let i = 0; i < this.respuesta.length; i++ ){

          if( this.respuesta[i].coleccion =="Aire"){

            if( this.respuesta[i].stock <= 0){
              console.log( this.respuesta )
              this.respuesta[i].coleccion = "oculta";
              this.stockServ.putFunko( this.respuesta[i], this.respuesta[i]._id )
              .subscribe( data => console.log( data ));
            }

            this.funkos_aire.push( this.respuesta[i] );

          }
        }
      }
    )
  }

  consola( index: number ){
    this.buscar.mostrarFunko( this.funkos_aire[index].name, this.router.url );
    
  }

  conocerSiHayDescuento( index: number ): boolean{

    if( this.funkos_aire[index].promo != 0 &&  this.funkos_aire[index].promo != null ) return true;
    else return false;
  }
  


}

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { funko } from '../../interface';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { BuscarService } from 'src/app/services/buscar.service';

@Component({
  selector: 'app-agua',
  templateUrl: './agua.component.html',
  styleUrls: ['./agua.component.css']
})
export class AguaComponent implements OnInit {

  respuesta: funko[] = [];

  constructor( private stockServ: StockService, private router: Router, private buscar: BuscarService ) { }

  funkos_agua: funko[] = [];

  ngOnInit(): void {

    this.stockServ.getAllFunkos()
    .subscribe(
      data =>{

        this.respuesta = data;

        for( let i = 0; i < this.respuesta.length; i++ ){

          
          if( this.respuesta[i].coleccion =="Agua"){

            if( this.respuesta[i].stock <= 0){
              console.log( this.respuesta )
              this.respuesta[i].coleccion = "oculta";
              this.stockServ.putFunko( this.respuesta[i], this.respuesta[i]._id )
              .subscribe( data => console.log( data ));
            }

            this.funkos_agua.push( this.respuesta[i] );

          }
        }
      }
    )

  }

  consola( index: number ){
    this.buscar.mostrarFunko( this.funkos_agua[index].name, this.router.url );
  }


  conocerSiHayDescuento( index: number ): boolean{

    if( this.funkos_agua[index].promo != 0 &&  this.funkos_agua[index].promo != null ) return true;
    else return false;
  }
  
}

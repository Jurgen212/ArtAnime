import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscarService } from 'src/app/services/buscar.service';
import { StockService } from 'src/app/services/stock.service';
import { funko } from '../../interface';

@Component({
  selector: 'app-soon',
  templateUrl: './soon.component.html',
  styleUrls: ['./soon.component.css']
})
export class SoonComponent implements OnInit {

  funkos_proximos:funko[] = []


  respuesta: funko[] = [];

  constructor( private stockServ: StockService, private router: Router, private buscar: BuscarService ) { }

  funkos_agua: funko[] = [];

  ngOnInit(): void {

    this.stockServ.getAllFunkos()
    .subscribe(
      data =>{

        this.respuesta = data;

        for( let i = 0; i < this.respuesta.length; i++ ){

          
          if( this.respuesta[i].coleccion =="Cooming soon"){

            if( this.respuesta[i].stock == 0){
              console.log( this.respuesta )
              this.respuesta[i].coleccion = "oculta";
              this.stockServ.putFunko( this.respuesta[i], this.respuesta[i]._id )
              .subscribe( data => console.log( data ));
            }

            this.funkos_proximos.push( this.respuesta[i] );

          }
        }
      }
    )

  }

  consola( index: number ){
    this.buscar.mostrarFunko( this.funkos_proximos[index]._id, this.router.url );
  }
}

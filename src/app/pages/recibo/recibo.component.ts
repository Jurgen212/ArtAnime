import { Component, OnInit } from '@angular/core';
import { funko, registroItem } from '../../interface';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';


interface funkoComprar {
  nombre  : string,
  cantidad: number,
  precio  : number,
}


@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {

  constructor( private router: Router, private stockServ: StockService  ) { }

  
  personajesDelCarrito: funko[]  = [];
  cantidadesComprar   : number[] = [];
  tipoEnvio           : number = 0;
  nombrePersona       : string = "";
  numeroFactura       : number = 0;

  funkoMostrar: funkoComprar = {
   nombre      : '',
   cantidad    : 0,
   precio      : 0,
   
  }


  funkoEnviar: registroItem = {
    name            : '',
    priceTotal      : 0,
    funkoImage      : '',
    material        : '',
    cantidadComprado: 0,
    coleccion       : '',
    nombreComprador : ''
  }
  

  mostrarFunkosComprar: funkoComprar[] = [];
  funkosActualizar: funko[] = [];
  ngOnInit(): void {


    this.numeroFactura = Math.round( Math.random() * 1000000000000);
    this.personajesDelCarrito = JSON.parse( localStorage.getItem("carrito")       ! );
    this.cantidadesComprar    = JSON.parse( localStorage.getItem("numero_carrito")! );
    this.tipoEnvio            = JSON.parse( localStorage.getItem("precio_envio"  )! );
    this.nombrePersona        = JSON.parse( localStorage.getItem("nombre_tarjeta")! );


    this.funkosActualizar = JSON.parse( localStorage.getItem("carrito")! );

    for( let i = 0; i < this.personajesDelCarrito.length; i++ ){

      
      this.funkoMostrar.nombre  = this.personajesDelCarrito[ i ].name;
      this.funkoMostrar.cantidad = this.cantidadesComprar[i];
      this.funkoMostrar.precio  = this.personajesDelCarrito[i].price * this.cantidadesComprar[i];

      console.log( this.funkoMostrar)
      this.mostrarFunkosComprar.push( this.funkoMostrar );

      this.funkoMostrar = {
        nombre      : '',
        cantidad    : 0,
        precio      : 0,
        
       }
    }


    this.agregarRegistro();
    this.eliminarLocalHost();
  }

  generarTotal(){
    let total: number = 0;

    for ( let i = 0; i < this.mostrarFunkosComprar.length; i++ ){

      total += this.mostrarFunkosComprar[i].precio;
    }
    total += this.tipoEnvio;

    return total;
  }
  
  agregarRegistro(){

    for( let i = 0; i < this.personajesDelCarrito.length; i++ ){

      this.llenarFunko(i);
      this.stockServ.setRegister( this.funkoEnviar )
      .subscribe( data => console.log( data ) );

      this.vaciarFunko();
    }
  }

  llenarFunko( index: number ){

    this.funkoEnviar.name             = this.personajesDelCarrito[ index ].name;
    this.funkoEnviar.priceTotal       = this.personajesDelCarrito[index].price * this.cantidadesComprar[ index ];
    this.funkoEnviar.funkoImage      = this.personajesDelCarrito[ index ].funkoImage;
    this.funkoEnviar.material         = this.personajesDelCarrito[ index ].material;
    this.funkoEnviar.cantidadComprado = this.cantidadesComprar[ index ];
    this.funkoEnviar.coleccion        = this.personajesDelCarrito[index].coleccion;
    this.funkoEnviar.nombreComprador  = this.nombrePersona;

    this.funkosActualizar[ index ].stock = this.funkosActualizar[index].stock - this.cantidadesComprar[index];

    this.stockServ.putFunko( this.funkosActualizar[index], this.funkosActualizar[index]._id )
    .subscribe( data => console.log( data ));
  }

  vaciarFunko(){

    this.funkoEnviar.name = '',
    this.funkoEnviar.priceTotal = 0;
    this.funkoEnviar.funkoImage = '';
    this.funkoEnviar.material = '';
    this.funkoEnviar.cantidadComprado = 0;
    this.funkoEnviar.coleccion = '';
    this.funkoEnviar.nombreComprador = '';
  }



  eliminarLocalHost(){
    
      localStorage.removeItem("carrito");
      localStorage.removeItem("numero_carrito");
      localStorage.removeItem("nombre_tarjeta");
      localStorage.removeItem("precio_envio");
  }

  

}

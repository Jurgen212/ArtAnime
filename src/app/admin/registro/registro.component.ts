import { Component, OnInit } from '@angular/core';
import { registroItem } from '../../interface';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor( private stockServ: StockService ) { }


  arregloRegistro: registroItem[] = [];
  sumaProductosVendidos: number = 0;
  numeroAire  : number  = 0;
  numeroTierra: number  = 0;
  numeroAgua  : number  = 0;

  coleccionMayoritaria: string = "";

  sumatoriaPrecios: number = 0;


  ngOnInit(): void {

    this.stockServ.getRegister()
    .subscribe( data => {
      this.arregloRegistro = data;
    })

  }


  totalVendido(): number {
    let sumaTotal : number = 0;
    this.sumaProductosVendidos = 0;
    this.numeroAgua   = 0;
    this.numeroAire   = 0;
    this.numeroTierra = 0;

    for( let i = 0; i < this.arregloRegistro.length; i++ ){

      this.sumaProductosVendidos = this.sumaProductosVendidos + this.arregloRegistro[i].cantidadComprado;
      sumaTotal = sumaTotal + this.arregloRegistro[i].priceTotal;

      this.coleccionMasVendida( i );
    }

    this.asignarMasVendida();
    return sumaTotal;
  }


  coleccionMasVendida( i: number ){

      if( this.arregloRegistro[i].coleccion == "Aire" ){
        this.numeroAire ++;
      }
      else if( this.arregloRegistro[i].coleccion == "Agua" ){
        this.numeroAgua ++;
      }
      else{
        this.numeroTierra ++;
      }
  }


  asignarMasVendida(){

    if( this.numeroAgua > this.numeroTierra && this.numeroAgua > this.numeroAire ){
      this.coleccionMayoritaria = "Agua";
    }
    else if( this.numeroAire > this.numeroTierra && this.numeroAire > this.numeroAgua ){
      this.coleccionMayoritaria = "Aire";
    }
    else{
      this.coleccionMayoritaria = "Tierra;"
    }
  }

};


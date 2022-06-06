import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { funko } from '../../interface';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor( private stock: StockService ) { }

  arregloFiguras: funko[] = [];

  ngOnInit(): void {

    this.stock.getAllFunkos()
    .subscribe( data =>{

      this.arregloFiguras = this.ordenarArreglo( data );  
    })
  }


  colorFigurasAgotadas( index: number ): string{

    if( this.arregloFiguras[ index ].stock == 0){
       return "red"
    }
    else { 
      return "black" 
    } 
}




ordenarArreglo( array: funko[] ){
  let arreglo_stock = [];
  let arreglo_nuevo = [];
  let arreglo_stock_orden = [];

  for( let i = 0; i < array.length; i++){
    
    arreglo_stock.push( array[i].stock  );
  }
  arreglo_stock = arreglo_stock.sort();

  for( let i = arreglo_stock.length - 1; i >= 0; i--){
    arreglo_stock_orden.push( arreglo_stock[i] );
  }

  for( let i = 0; i < arreglo_stock_orden.length; i++){
    for( let j = 0; j < arreglo_stock_orden.length; j++){

      if( array[j].stock  == arreglo_stock_orden[i] ){

        arreglo_nuevo.push( array[j] );
      }
    }
  } 
  return arreglo_nuevo;
}

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { funko } from '../../interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  constructor( private stockServ: StockService, private fb: FormBuilder ) { }


 @Output() id_enviar = new EventEmitter<string>();

  lista_todos: funko[] = [];

  lista_aire    : funko[] = [];
  lista_tierra  : funko[] = [];
  lista_agua    : funko[] = [];

  ngOnInit(): void {

    this.stockServ.getAllFunkos()
    .subscribe( data =>{
      this.lista_todos = data;

      for( let i = 0; i < this.lista_todos.length; i ++){

        if( this.lista_todos[i].stock == 0){
          console.log( this.lista_todos )
          this.lista_todos[i].coleccion = "oculta";
          this.stockServ.putFunko( this.lista_todos[i], this.lista_todos[i]._id )
          .subscribe( data => console.log( data ));
        }

        if( this.lista_todos[i].coleccion == "Tierra"  ){
          
          this.lista_tierra.push( this.lista_todos[i] );
        }
        else if( this.lista_todos[i].coleccion == "Aire" ){
          this.lista_aire.push( this.lista_todos[i] );
        }
        else if( this.lista_todos[i].coleccion == "Agua" ){
          this.lista_agua.push( this.lista_todos[i] );
        } 

    }

})

}

  seleccionado( id: string){
    this.id_enviar.emit( id );
  }

  
}

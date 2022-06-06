import { Component, OnInit } from '@angular/core';
import { funko } from 'src/app/interface';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-escondidos',
  templateUrl: './escondidos.component.html',
  styleUrls: ['./escondidos.component.css']
})
export class EscondidosComponent implements OnInit {

  constructor( private stockServ: StockService ) { }

  lista_ocultos: funko[] = [];
  lista_todos  : funko[] = [];
  

  funko_remover : funko[] = [{
    _id         : '',
    name        : '',
    price       : 0,
    stock       : 0,
    coleccion   : '',
    material    :'',
    funkoImage  : '',
    __v         : 0,
    des         : ''
  }]

  ngOnInit(): void {
  
    this.stockServ.getAllFunkos()
    .subscribe( data =>{

      this.lista_todos = data;
      for( let i = 0; i < this.lista_todos.length ; i++){

        if( this.lista_todos[i].coleccion == "oculta" ){
          this.lista_ocultos.push( this.lista_todos[i] );
        }
      }

    })
  }


  tierra: string = "tierra";
  agua  : string = "agua"  ;
  aire  : string = "aire"  ;


  seleccionado( id: string, coleccion: string ){
    
    this.stockServ.getFunkoById( id )
    .subscribe( data => { 
      console.log( data );
      this.funko_remover[0].name       = data[0].name;
      this.funko_remover[0].price      = data[0].price;
      this.funko_remover[0].funkoImage = data[0].funkoImage;
      this.funko_remover[0].material   = data[0].material;
      this.funko_remover[0].stock      = data[0].stock;
      this.funko_remover[0].coleccion  = data[0].coleccion;
      this.funko_remover[0]._id        = data[0]._id;
      this.funko_remover[0].__v        = data[0].__v;
      this.funko_remover[0].des        = data[0].des;

      if( coleccion == this.tierra ){
        this.funko_remover[0].coleccion = "Tierra";
      }
      else if( coleccion == this.agua ){
        this.funko_remover[0].coleccion = "Agua";
      }
      else{
        this.funko_remover[0].coleccion = "Aire";
      }
  
      this.stockServ.putFunko( this.funko_remover[0], id )
      .subscribe( data =>{
        console.log( data );
        location.reload();
      })
      
      
    });

    
  }
}

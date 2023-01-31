import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { funko } from '../../interface';


@Component({
  selector: 'app-esconder',
  templateUrl: './esconder.component.html',
  styleUrls: ['./esconder.component.css']
})
export class EsconderComponent implements OnInit {

  constructor( private stockServ: StockService ) { }

  ngOnInit(): void {
  }


  funko_esconder: funko[] = [{
    _id         : '',
    name        : '',
    price       : 0,
    stock       : 0,
    coleccion   : '',
    material    :'',
    funkoImage  : '',
    __v         : 0,
    des         : '',
  }]


  buscando: boolean = true;

  recibiendo_id( id: string ){
    console.log( id );
    
    this.stockServ.getFunkoById( id )
    .subscribe( data =>{
      this.funko_esconder = data;
      this.buscando = false;
    })
    
  }

  aceptar(){
    this.buscando = true;
    this.funko_esconder[0].coleccion = "oculta";

    if( this.funko_esconder[0].name != "") {

      this.stockServ.putFunko( this.funko_esconder[0], this.funko_esconder[0]._id )
      .subscribe( data => { 
        console.log( data );
        location.reload();
      });

    }
  }

  cancelar(){
    this.buscando = true;
  }
}

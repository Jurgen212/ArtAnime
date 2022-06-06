import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { funko } from '../../interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  advertencia : boolean = false;

  personajes: funko[] = [];

  constructor( private stockServ: StockService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.personajes  = [];
  }

  miFormulario: FormGroup = this.fb.group({
    name: [ , Validators.required ]
  })
  
  buscar(){

    this.personajes = [];
    this.stockServ.getFunkoById( this.miFormulario.value.name )
    .subscribe( data =>{

      this.personajes = data;
      
      this.mostrarAdvertencia();
    } );

  }



  mostrarAdvertencia(){
    if( this.personajes.length == 0 ) this.advertencia = true;
    
    else this.advertencia = false;
  };
}

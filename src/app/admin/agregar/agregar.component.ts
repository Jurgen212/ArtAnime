import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { funko, addFunko } from '../../interface';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(  private fb: FormBuilder, private stockServ: StockService ) { }

  ngOnInit(): void {

    this.miFormulario.value.name        = "";
    this.miFormulario.value.price       = "";
    this.miFormulario.value.material    = "";
    this.miFormulario.value.stock       = "";
    this.miFormulario.value.coleccion   = "";
    this.miFormulario.value.funkoImage  = "";
    this.miFormulario.value.des         = "";

    this.mostrar_chulo = false;


    
  }

  datosIncorrectos  : boolean = false;
  nombre_largo      : boolean = false;
  mostrar_chulo     : boolean = false;


  miFormulario: FormGroup = this.fb.group({
    name      : [ , [ Validators.required ] ],
    price     : [ , [ Validators.required ] ],
    material  : [ , [ Validators.required ] ],
    stock     : [ , [ Validators.required ] ],
    coleccion : [ , [ Validators.required ] ],
    funkoImage: [ , [ Validators.required ] ],
    des       : [ , [ Validators.required ] ],
  });

  
  funkoNuevo: addFunko = {
    name      : "",
    price     : "",
    material  : "",
    stock     : "",
    coleccion : "",
    funkoImage: "",
    des       : ""
  }

  guardar(){

    if( this.miFormulario.value.coleccion == "Agua" ||  this.miFormulario.value.coleccion == "Tierra" || this.miFormulario.value.coleccion == "Aire" || this.miFormulario.value.coleccion == "Cooming soon"){
      this.datosIncorrectos = false;
      
    }
    else{
      this.datosIncorrectos = true;

      return;
      
    }
    
    if( this.miFormulario.value.material != "Plástico" && this.miFormulario.value.material != "Resina" ){
      this.datosIncorrectos = true;
      
      return;
    }

    if( this.miFormulario.value.des == "" || this.miFormulario.value.name == "" || this.miFormulario.value.price == "" || this.miFormulario.value.funkoImage == undefined || this.miFormulario.value.stock  == "" || this.miFormulario.value.funkoImage == ""){
      this.datosIncorrectos = true;
      this.miFormulario.reset;
      
      return; 
    }

    if( this.miFormulario.value.name.length > 25 ){
      this.nombre_largo = true;
      return;
    }
    

    this.nombre_largo = false;
    this.datosIncorrectos = false;


    //Crear el objeto con los datos recibidos
    this.funkoNuevo = {
      name      : this.miFormulario.value.name,
      price     : this.miFormulario.value.price,
      material  : this.miFormulario.value.material,
      stock     : this.miFormulario.value.stock,
      coleccion : this.miFormulario.value.coleccion,
      funkoImage: this.miFormulario.value.funkoImage,
      des       : this.miFormulario.value.des,
      nCa       : this.miFormulario.value.price
    }
    
    //Agregar el objeto a la database
    this.stockServ.setFunko( this.funkoNuevo  )
    .subscribe( data => console.log( data ));
    
    //poner los campos en blanco
    this.miFormulario.reset();

    this.mostrar_chulo = true;
    setInterval( () => this.mostrar_chulo = false, 1000)
  }
}

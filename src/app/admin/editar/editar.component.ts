import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { addFunko, funko } from '../../interface';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  mostrar_chulo     : boolean = false;

  constructor( private fb: FormBuilder, private stockServ: StockService ) { }

  funko_editar: funko[] = [{
    _id         : '',
    name        : '',
    price       : 0,
    stock       : 0,
    coleccion   : '',
    material    :'',
    funkoImage  : '',
    __v         : 0,
    des         : ''
  }];



  miFormulario: FormGroup = this.fb.group({
    name      : [ , [ Validators.required ] ],
    price     : [ , [ Validators.required ] ],
    material  : [ , [ Validators.required ] ],
    stock     : [ , [ Validators.required ] ],
    coleccion : [ , [ Validators.required ] ],
    funkoImage: [ , [ Validators.required ] ],
    des       : [ , [ Validators.required ] ],
    prom      : new FormControl( null )

  });

  ngOnInit(): void {
    
    console.log("Hoal")
    //mientras carga la data mostraremos la siguiente info
    if( !this.buscando ){
      this.miFormulario.setValue({
        name        : "Por favor espere",
        price       : "Por favor espere",
        material    : "Por favor espere",
        stock       : "Por favor espere",
        coleccion   : "Por favor espere",
        funkoImage  : "Por favor espere",
        des         : "Por favor espere"
    })
    }
    

  }

  buscando        : boolean = true;
  datosIncorrectos: boolean = false;
  nombre_largo     : boolean = false;


  recibiendo_id( id: string){
    
    this.buscando = false;

    this.stockServ.getFunkoById( id )
    .subscribe( data => {
      this.funko_editar = data;
      console.log( this.funko_editar)

      //Damos a los inputs el valor del funko
      this.miFormulario.setValue({
        name      : this.funko_editar[0].name,
        price     : this.funko_editar[0].price,
        material  : this.funko_editar[0].material,
        stock     : this.funko_editar[0].stock,
        coleccion : this.funko_editar[0].coleccion,
        funkoImage: this.funko_editar[0].funkoImage,
        des       : this.funko_editar[0].des,
        prom      : this.funko_editar[0].promo || null
      })
    });    
  }


  guardar(){
    if( this.miFormulario.value.coleccion == "Agua" ||  this.miFormulario.value.coleccion == "Tierra" || this.miFormulario.value.coleccion == "Aire" || this.miFormulario.value.coleccion =="Cooming soon"){
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

    if( this.miFormulario.value.des == "" || this.miFormulario.value.name == "" || this.miFormulario.value.price < 0 || this.miFormulario.value.funkoImage == "" || this.miFormulario.value.stock  < 0 ){
      this.datosIncorrectos = true;
      
      return; 
    }

    
    if( this.miFormulario.value.name.length > 25 ){
      this.nombre_largo = true;
    
      return;
    }
    

    //Eliminamos los errores que hayan aparecido
    this.nombre_largo = false;
    this.datosIncorrectos = false;

    this.mostrar_chulo = true;
    setInterval( () => this.mostrar_chulo = false, 1000);

    //Asignamos al funko los nuevos cambios

    this.funko_editar[0].name      = this.miFormulario.value.name       ;
    this.funko_editar[0].nCa       = this.miFormulario.value.price - ( this.miFormulario.value.price * this.miFormulario.value.prom );
    this.funko_editar[0].material  = this.miFormulario.value.material   ;
    this.funko_editar[0].coleccion = this.miFormulario.value.coleccion  ;
    this.funko_editar[0].funkoImage= this.miFormulario.value.funkoImage ;
    this.funko_editar[0].stock     = this.miFormulario.value.stock      ;
    this.funko_editar[0].des       = this.miFormulario.value.des        ;
    this.funko_editar[0].promo     = this.miFormulario.value.prom       ;
    this.funko_editar[0].price     = this.miFormulario.value.price      ;

    this.stockServ.putFunko( this.funko_editar[0],  this.funko_editar[0]._id)
    .subscribe( data => {
      this.buscando = true;
    });    
  }
}

import { Component, OnInit } from '@angular/core';
import { funko, usuario } from '../../interface';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit {

  funkosEnCarrito        : funko[]  = [];
  cantidadesSeleccionadas: number[] = [];
  partePagos             : boolean = false;
  parteEnvios            : boolean = false;
  totalConEnvio          : number  = 0;

  dataPagoIncorrecta     : boolean = false;
  dataEnvioIncorrecta    : boolean = false;
  informacionFormulario  : string = "";

  nombreUsuario : string           = "";
  mostrarChulo  : boolean          = false;
  sesionIniciada: boolean          = false;



  usuarioCompleto: usuario = {
    name            : '',
    mail            : '',
    contrasena      : '',
    contrasenaReal  : '',
    nameReal        : '',
    apellido        : '',
    direccion       : ''
  }
  
  constructor( private stockServ: StockService,  private fb: FormBuilder, private router: Router ) { 
    
  }



  ngOnInit(): void {
    console.clear();

    if( JSON.parse(localStorage.getItem("nombre_login")! ) != undefined ){
      this.nombreUsuario    = JSON.parse( localStorage.getItem("nombre_login")! );
      this.usuarioCompleto  = JSON.parse( localStorage.getItem("usuario_final")! );


      this.formularioEnvio.reset({
        nombre        : this.usuarioCompleto.nameReal,
        apellido      : this.usuarioCompleto.apellido,
        direccion     : this.usuarioCompleto.direccion
      });

      this.informacionFormulario = this.usuarioCompleto.nameReal;
    }
    else {
      this.nombreUsuario = "administrador"
    }

    this.comprobarSesionIniciada();

    if( this.conocerSiExisteNumeroElementosEnCarrito() ){
      this.cantidadesSeleccionadas = JSON.parse( localStorage.getItem("numero_carrito")! );
    }
    else{
      this.cantidadesSeleccionadas = [];
    }

    this.validarSiExisteCarrito();
  }

 
  validarSiExisteCarrito(){

    if( this.devolverCarritoDelLocal() != null ){

      this.funkosEnCarrito = this.devolverCarritoDelLocal();
      this.actualizarCantidadApenasEntra();
    }
    else{
      localStorage.removeItem("numero_carrito");
      this.funkosEnCarrito = [];
    }
  }


  
  devolverCarritoDelLocal(): funko[]{
    return  JSON.parse( localStorage.getItem("carrito")!);
  }



  actualizarCantidadApenasEntra(){
    
    if( !this.conocerSiExisteNumeroElementosEnCarrito() ){

      for( let i = 0; i < this.funkosEnCarrito.length; i++ ) { 
        this.cantidadesSeleccionadas[i] = 1;
      }
      localStorage.setItem("numero_carrito", JSON.stringify( this.cantidadesSeleccionadas ) );
    }
    
    else{

      this.cantidadesSeleccionadas = JSON.parse( localStorage.getItem("numero_carrito")!);

      for( let i = 0; i < this.funkosEnCarrito.length; i++ ){
        
        if( this.cantidadesSeleccionadas[i] == undefined ){

          console.log("Error salvado");
          this.cantidadesSeleccionadas[i] = 1;
          localStorage.setItem("numero_carrito", JSON.stringify( this.cantidadesSeleccionadas ) );
        }
      }
    }
   
    this.generarTotal();
  }


  conocerSiExisteNumeroElementosEnCarrito(): boolean{
    if( localStorage.getItem("numero_carrito") != undefined  ) return true;
    else return false;
  }


  condicionParaSumar( index: number, sumar: boolean ): boolean{
    
    return this.cantidadesSeleccionadas[index] >= 1 && this.cantidadesSeleccionadas[ index ] < this.funkosEnCarrito[ index ].stock && sumar; 
  }



  validarCantidadEnRangoCorrecto( index: number, sumar: boolean ): boolean | undefined{

    if( this.condicionParaSumar( index, sumar ) ) return true; 

    else if ( this.cantidadesSeleccionadas[index] > 1 ) return false;
    
    return;
  }



  actualizarCantidadSeleccionada( index: number, sumar: boolean ){
    
   if( this.validarCantidadEnRangoCorrecto( index, sumar ) ) this.cantidadesSeleccionadas[index]++;
   
   else if( this.validarCantidadEnRangoCorrecto( index, sumar ) != undefined  ) {
     this.cantidadesSeleccionadas[index]--;
   }
   
   this.generarTotal();
  }




  generarTotal(): number{
    let cantidadTotal: number = 0;
    
    this.añadirCarritoNumeroElementos();
    for( let i = 0; i < this.funkosEnCarrito.length; i++ ){

      cantidadTotal += this.validarSiTieneDescuento( i );
    }
    
    return cantidadTotal;
  }

  validarSiTieneDescuento( i : number ):  number{
    if( this.funkosEnCarrito[i].nCa == undefined ){
      return this.cantidadesSeleccionadas[i] * this.funkosEnCarrito[i].price;
    }
    else{
      return this.cantidadesSeleccionadas[i] * this.funkosEnCarrito[i].nCa!;
    }
  }


  conocerPrecio( i : number ): number{
    if( this.funkosEnCarrito[i].nCa == undefined ){
      return this.funkosEnCarrito[i].price;
    }
    else{
      return this.funkosEnCarrito[i].nCa!;
    }
  }


  añadirCarritoNumeroElementos(): void{
    if( this.conocerSiExisteNumeroElementosEnCarrito() ){
      
      localStorage.setItem("numero_carrito", JSON.stringify( this.cantidadesSeleccionadas ));
      this.cantidadesSeleccionadas = JSON.parse( localStorage.getItem("numero_carrito")! );
    }
  }


  remover_elemento( index: number ){

    this.cantidadesSeleccionadas.splice( index, 1 );
    this.funkosEnCarrito.splice( index, 1 );
    localStorage.setItem("carrito", JSON.stringify( this.funkosEnCarrito          ));
    localStorage.setItem("numero_carrito", JSON.stringify( this.cantidadesSeleccionadas  ));
    this.validarSiQuedaVacio();
  }


  validarSiQuedaVacio(){

    if( this.cantidadesSeleccionadas.length == 0 ){
      localStorage.removeItem("carrito");
      localStorage.removeItem("numero_carrito");
    }
  }


  //Parte de pagos ------------------------------------------------------------------------------

  miFormulario: FormGroup = this.fb.group({
    name       : [ , [ Validators.required ] ],
    number     : [ , [ Validators.required ] ],
    ccv        : [ , [ Validators.required ] ],
    expiration : [ , [ Validators.required ] ]
  });

  realizarCompraFinal(){

    if( this.comprobarDataCorrecta() ){

      console.log( localStorage.getItem("carrito"));
      console.log( localStorage.getItem("numero_carrito"));
      console.log( this.generarTotalEnvio() );
      console.log( this.miFormulario.value );

      this.funkosEnCarrito = [];
      this.cantidadesSeleccionadas = [];
      console.log( this.funkosEnCarrito , this.cantidadesSeleccionadas)

      this.totalConEnvio = 0;
      this.dataPagoIncorrecta = false;

      this.mostrarChuloMetodo();
  
    }

    else{
      this.dataPagoIncorrecta = true;
    }
    
  };

  comprobarDataCorrecta(): boolean{
 
    if( this.miFormulario.valid && JSON.stringify( this.miFormulario.value.number).length >= 10 && JSON.stringify( this.miFormulario.value.ccv).length >= 3 ){
      return true;
    }
    else{
      return false;
    }
  };  


  volverCarrito(){
      this.parteEnvios = false;
      this.partePagos = false;
  }

  
  
  cambiarVentanaAEnvio(){
    this.partePagos = false;
    this.parteEnvios = true;
    this.totalConEnvio = this.generarTotal();
  }


  mostrarChuloMetodo(){
    this.mostrarChulo = true;
    setInterval( () => { 
      this.mostrarChulo = false;
      
    }, 2000);
    localStorage.setItem("nombre_tarjeta", JSON.stringify( this.informacionFormulario ));
    this.volverCarrito();
    this.router.navigate(['home/recibo']);
  }

  //Parte de metodo de envio


  formularioEnvio: FormGroup = this.fb.group({
    nombre        : [ , [ Validators.required ] ],
    apellido      : [ , [ Validators.required ] ],
    cell          : [ , [ Validators.required ] ],
    direccion     : [ , [ Validators.required ] ],
    especificacion: [ ],
    options       : [ , [ Validators.required ] ]
  });

  

  opcionesEnvios: string[] = [
    "----- SELECCIONA METODO ENVIO "            ,
    "Servientrega-12.500COP (entrega en 2 días)",
    "UPS-11.000COP (entrega en 4 días)"         ,
    "DHL-10.000COP (entrega en 1 días)"         ,
    "Fedex-20.000COP (entrega en 7 días)"       ,
    "Envía-25.000COP (entrega en 3 días)"       ,
    "TCC-12.000COP (entrega en 8 días)"         ,
    "Interrapidísimo-12.000COP (entrega en 1 días)"
  ]

  comprobarDataEnvio(){

    if( this.formularioEnvio.valid ){
      return true;
    } else return false;
  }


  enviarDataEnvio(){
    
    if( this.comprobarDataEnvio() ){
      this.dataEnvioIncorrecta = false;
      
      this.partePagos = true;
      this.parteEnvios = false;

    }else {
      this.dataEnvioIncorrecta = true;
    };
  };


  generarTotalEnvio(){

    let precioOpcionSeleccionada: number  = 12500;

    if( this.formularioEnvio.value.options != "----- SELECCIONA METODO ENVIO"){

      if( this.formularioEnvio.value.options == "Servientrega-12.500COP (entrega en 2 días)" ){

        precioOpcionSeleccionada = 12500;
        localStorage.setItem("precio_envio", JSON.stringify( 12500) );
      }
      else if( this.formularioEnvio.value.options == "UPS-11.000COP (entrega en 4 días)"     ){

        precioOpcionSeleccionada = 11000;
        localStorage.setItem("precio_envio", JSON.stringify( 11000) );
      }
      else if( this.formularioEnvio.value.options == "DHL-10.000COP (entrega en 1 días)"     ){

        precioOpcionSeleccionada = 10000;
        localStorage.setItem("precio_envio", JSON.stringify( 10000) );
      }
      else if( this.formularioEnvio.value.options == "Fedex-20.000COP (entrega en 7 días)"   ){

        precioOpcionSeleccionada = 20000;
        localStorage.setItem("precio_envio", JSON.stringify( 20000) );
      }
      else if( this.formularioEnvio.value.options == "Envía-25.000COP (entrega en 3 días)"   ){

        precioOpcionSeleccionada = 25000;
        localStorage.setItem("precio_envio", JSON.stringify( 25000) );
      }
      else if( this.formularioEnvio.value.options == "TCC-12.000COP (entrega en 8 días)"     ){

        precioOpcionSeleccionada = 12000;
        localStorage.setItem("precio_envio", JSON.stringify( 12000) );
      }
      else if( this.formularioEnvio.value.options == "Interrapidísimo-12.000COP (entrega en 1 días)" ){
        
        precioOpcionSeleccionada = 12000;
        localStorage.setItem("precio_envio", JSON.stringify( 12000) );
      }
  
      this.totalConEnvio = this.generarTotal() + precioOpcionSeleccionada;
      return this.totalConEnvio;
    }

    else{
      this.dataEnvioIncorrecta = true;
      return; 
    }
    
  }



  comprobarSesionIniciada(){
    if( localStorage.getItem("nombre_login") != undefined || localStorage.getItem("id") != undefined){
      this.sesionIniciada = true;
    }
  }


  cerrarSesion(){
    localStorage.removeItem("nombre_login");
    localStorage.removeItem("usuario_final");
    localStorage.removeItem("carrito");
    localStorage.removeItem("numero_carrito");
    this.router.navigate(['/home/*']);
  };
};

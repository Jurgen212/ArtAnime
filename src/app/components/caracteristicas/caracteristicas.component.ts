import { Component, OnInit } from '@angular/core';
import { BuscarService } from '../../services/buscar.service';
import { funko } from '../../interface';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.css']
})
export class CaracteristicasComponent implements OnInit {

  mostrar_chulo = false;
  constructor(  private buscarServ: BuscarService,
                private router: Router,
                private StockServ: StockService,
                private fb       : FormBuilder ) {}

  funko_mostrar  !: funko;
  path_anterior   : string = "";
  hay_data        : boolean = false;
  yaExisteEnLocal : boolean = false;

  isNullCalificacion: boolean = false;
  calificacion: number = 0;
  nuevaCalificacion!: number;

  porcentajeDescuento: number = 0;

  ngOnInit(): void {

    if( this.buscarServ.getFunko()[1] != ""){
      this.hay_data = true;
      this.funko_mostrar = this.buscarServ.getFunko()[0];
      this.path_anterior = this.buscarServ.getFunko()[1];
    }
    else{
      this.volverAlPathAnterior();
    }

    this.cargarCalificacionFunko();

  }

  cargarCalificacionFunko(){
    if( this.validarSiYaFueCalificado() ){
      this.isNullCalificacion = false;
      this.calificacion = Math.round( this.buscarServ.getFunko()[0].stars );
    }
    else{
      this.isNullCalificacion = true;
    }
  }

  volverAlPathAnterior(){
    this.hay_data = false;
    this.router.navigate(['/home/personajes']);
  }

  devolverArregloCarrito(): funko[] | undefined {
    return JSON.parse( localStorage.getItem("carrito")! );
  }

  validador(): boolean{
    if( this.devolverArregloCarrito() != null ){
      return true;
    }
    else{
      return false;
    }
  }


  crearArregloCarrito( funkoAñadir: funko ){
    let arreglo_funkos: funko[] = [];
    arreglo_funkos.push( funkoAñadir );
    localStorage.setItem("carrito", JSON.stringify( arreglo_funkos ));
    this.mostrar_chulo = true;
    setInterval( () => this.mostrar_chulo = false, 1000);

  }


  añadirAlArregloExistenteCarrito( funkoAñadir: funko ){

    if( this.conocerSiYaExisteProductoEnCarrito( funkoAñadir ) ){
      let arreglo_funkos: funko[] | null = [];

      arreglo_funkos = JSON.parse( localStorage.getItem("carrito")! );
      arreglo_funkos?.push( funkoAñadir );
      localStorage.setItem("carrito", JSON.stringify( arreglo_funkos ));

    }
  }

  conocerSiYaExisteProductoEnCarrito( funkoAñadir: funko ): boolean{

    if( this.devolverArregloCarrito()?.length! > 0 ){

      for( let i = 0; i < this.devolverArregloCarrito()?.length!; i++ ){

        if( funkoAñadir.name == this.devolverArregloCarrito()![i].name && funkoAñadir.stock == this.devolverArregloCarrito()![i].stock ){
          this.yaExisteEnLocal = true;
          return false;
        }
      }
      this.yaExisteEnLocal = false;
      return true;
    }
    else{
      this.yaExisteEnLocal = false;
      return true;
    }
  }


  anadirAlCarrito( funkoAñadir: funko ){


    if( this.validador() ){
      this.añadirAlArregloExistenteCarrito( funkoAñadir )
      this.mostrar_chulo = true;
      setInterval( () => this.mostrar_chulo = false, 1000);
    }
    else{
      this.crearArregloCarrito( funkoAñadir );
    }
  }

  miFormulario: FormGroup = this.fb.group({
    opcionSeleccionada: new FormControl( null )
  })


  enviarCalificacion(){
    if( this.validarSiLaCalificacionLocalEsNull() ){

    }
    else{
      console.log( this.miFormulario.value.opcionSeleccionada );

      this.nuevaCalificacion = ( this.miFormulario.value.opcionSeleccionada + this.funko_mostrar.stars ) / 2;
      this.funko_mostrar.stars = this.nuevaCalificacion;
      this.calificacion = Math.round( this.funko_mostrar.stars );

      this.StockServ.putFunko( this.funko_mostrar, this.funko_mostrar._id )
      .subscribe( data => console.log( data ));
    }
  }



  obtenerCalificacionAnteriorFunko(): number{

    return this.buscarServ.getFunko()[0].stars;
  }



  validarSiYaFueCalificado(){
    if( this.buscarServ.getFunko()[0].stars != 0 && this.buscarServ.getFunko()[0].stars != undefined ){
      return true;
    }
    else{
      return false;
    }
  };



  validarSiLaCalificacionLocalEsNull(){
    if( this.miFormulario.value.opcionSeleccionada == null ){
      this.isNullCalificacion = true;
      return true;
    }
    else{
      this.isNullCalificacion = false;
      return false;
    }
  }




  conocerPromocion(): boolean {
    if( this.funko_mostrar.promo != 0 &&  this.funko_mostrar.nCa != null ){

      this.darValorPorcentajeDescuento();
      return true;
    }
    else return false;
  }


  darValorPorcentajeDescuento(){
    if( this.buscarServ.getFunko()[0].promo == 0.01 ){
      this.porcentajeDescuento = 10;
    }
    else{
      this.porcentajeDescuento = this.buscarServ.getFunko()[0].promo * 100;
    }
  }

}

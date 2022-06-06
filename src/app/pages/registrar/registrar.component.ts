import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { registroItem, usuario } from '../../interface';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  dataIncorrecta          : boolean = false;
  contrasenasIncoherentes : boolean = false;
  arregloUsuarios         : usuario[] = [];
  constructor( private fb: FormBuilder, private router: Router, private authServ: AuthService ) { }

  ngOnInit(): void {
  }

  miFormulario: FormGroup = this.fb.group({
    user            : [  , [ Validators.required, Validators.minLength(1) ] ],
    mail            : [  , [ Validators.required, Validators.minLength(1) ] ],
    contrasena      : [  , [ Validators.required, Validators.minLength(1) ] ],
    contrasenaAgain : [  , [ Validators.required, Validators.minLength(1) ] ],
    nameReal        : [  , [ Validators.required, Validators.minLength(1) ] ],
    apellido        : [  , [ Validators.required, Validators.minLength(1) ] ],
    direccion       : [  , [ Validators.required, Validators.minLength(1) ] ],
  })


  usuario: usuario = {
    name          : '',
    mail          : '',
    contrasena    : '',
    contrasenaReal: '',
    nameReal      : '',
    apellido      : '',
    direccion     : ''
  }

  guardar(){

   if ( this.verificarContrasenas() && this.validarCamposLLenos() ){ this.siSePuedeSubir() };

  }



  verificarContrasenas(): boolean{
    if( this.miFormulario.value.contrasena != this.miFormulario.value.contrasenaAgain ){
      this.contrasenasIncoherentes = true;
      return false;
    }
    else{
      this.contrasenasIncoherentes = false;
      return true;
    }
  }


  validarCamposLLenos(): boolean {
    if( this.miFormulario.valid ){
      this.dataIncorrecta = false;
      return true;
    }
    else{
      this.dataIncorrecta = true;
      return false;
    }
  }


  siSePuedeSubir(){
    this.pasarUsuarioInfo();
    this.crearArregloRegistros();
    this.vaciarInfo();
  }



  crearArregloRegistros(){
    if( localStorage.getItem('usuarioFinal') != null ){
      this.arregloUsuarios = JSON.parse( localStorage.getItem('usuarioFinal')! );
      this.arregloUsuarios.push( this.usuario );
      localStorage.setItem('usuarioFinal', JSON.stringify( this.arregloUsuarios) );
    }

    else{
      this.arregloUsuarios.push( this.usuario );
      localStorage.setItem('usuarioFinal', JSON.stringify( this.arregloUsuarios) );
    }
  }


  pasarUsuarioInfo(){
    this.usuario.name           = this.miFormulario.value.user          ;
    this.usuario.mail           = this.miFormulario.value.mail          ;
    this.usuario.contrasena     = this.miFormulario.value.contrasena    ;
    this.usuario.contrasenaReal = this.miFormulario.value.contrasenaReal;
    this.usuario.nameReal       = this.miFormulario.value.nameReal      ;
    this.usuario.apellido       = this.miFormulario.value.apellido      ;
    this.usuario.direccion      = this.miFormulario.value.direccion     ;

  }


  vaciarInfo(){
    this.miFormulario.reset();
  }
}

import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { usuario } from '../../interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private fb: FormBuilder, private router: Router, private authServ: AuthService ) { }

  dataIncorrecta: boolean = false;
  usuarioSeleccionado: usuario = {
    name          : '',
    mail          : '',
    contrasena    : '',
    contrasenaReal: '',
    nameReal      : '',
    apellido      : '',
    direccion     : ''
  };
  

  ngOnInit(): void {

    if( localStorage.getItem('id') == "true" ){
      this.miFormulario.reset({

        usuario:"admin",
        contraseña:123
      })

    }
    else if( this.usuarioSeleccionado.name != "" ){

      this.miFormulario.reset({
        usuario   : this.usuarioSeleccionado.name,
        contraseña: this.usuarioSeleccionado.contrasena
      })
    }
    else{
      this.miFormulario.reset({
        usuario   : "",
        contraseña: ""
      })
    }
  }

  miFormulario: FormGroup = this.fb.group({
    usuario  : [  , [ Validators.required ] ],
    contraseña: [  , [ Validators.required ] ]
    
  })

  guardar(){

      if( this.miFormulario.value.contraseña == 123 &&  this.miFormulario.value.usuario == "admin"){
        this.ingresoComoAdministrador();
      }
      else{
        
        if( this.dataIngresadaBien() ){
          this.validarSiExiste();
        }
        else{
          this.dataIncorrecta = true;
        }

      }
  }

  aceptar(){

    this.miFormulario.reset({
      usuario : "",
      contraseña: ""
    })

    this.authServ.isAuth = false;
    localStorage.removeItem('id');
  }


  ingresoComoAdministrador(){
      this.authServ.isAuth = true;
      localStorage.setItem('id', `${ this.authServ.isAuth }` );
      localStorage.removeItem('nombre_login');
      this.router.navigate(['./admin/administrador']);
  }

  ingresoComoNormal(){
    this.authServ.isAuth = false;
    localStorage.removeItem('id');
    this.router.navigate(['./home']);
  }

  validarSiExiste(){
    this.dataIncorrecta = true;

    let arregloLocal: usuario[] = JSON.parse( localStorage.getItem('usuarioFinal')!);

    for( let i = 0; i < arregloLocal.length; i++ ){
      
      if( this.miFormulario.value.usuario == arregloLocal[i].name ){

        if( this.miFormulario.value.contraseña == arregloLocal[i].contrasena  ){
          this.usuarioSeleccionado = arregloLocal[i];

          localStorage.removeItem('nombre_login');
          localStorage.setItem("usuario_final", JSON.stringify( this.usuarioSeleccionado! ) )
          localStorage.setItem('nombre_login', JSON.stringify( this.usuarioSeleccionado.nameReal!) );
          this.ingresoComoNormal();
          this.dataIncorrecta = false;
          return;
        }
      }
    }
  }

  
  dataIngresadaBien(): boolean{
    return this.miFormulario.valid;
  }
  

 
}

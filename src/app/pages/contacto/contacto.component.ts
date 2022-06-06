import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { usuario } from '../../interface';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  infoUsuario   : usuario = JSON.parse( localStorage.getItem("usuario_final")! );
  dataIncorrecta: boolean = false;
  mostrar_chulo : boolean = false;

  constructor( private fb: FormBuilder, private http: HttpClient ) { }

  


  ngOnInit(): void {
    this.ponerInfoFormulario();
  }

  miFormulario: FormGroup = this.fb.group({
    name     : [ , [ Validators.required ] ],
    mail     : [ , [ Validators.required ] ],
    comment  : [ , [ Validators.required ] ],
  });


  ponerInfoFormulario(){
    
    if( localStorage.getItem("usuario_final") != undefined ) this.ponerInfoUsuarioRegistrado();
    else this.infoPredeterminada();
  }


  ponerInfoUsuarioRegistrado(){

    let nombreUsuario: string = this.infoUsuario.nameReal;
    let correoUsuario: string = this.infoUsuario.mail    ;

      this.miFormulario.reset({
        name    : nombreUsuario,
        mail   : correoUsuario,
        comment : ""
      })
  }


  infoPredeterminada(){

    this.miFormulario.reset({
      name    : "",
      email   : "",
      comment : ""
    })
  }

  guardar(){
    this.revisarData();
  }

  revisarData(): boolean{
    if( this.miFormulario.valid ){ 

      this.dataIncorrecta = false;
      this.enviarInformacion();
      return true;
    }
    else{

      this.dataIncorrecta = true
      return false;
    };

  }
  


  enviarInformacion(){

    let email = this.miFormulario.value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('https://formspree.io/f/meqnvrop',
    { name: email.name, replyto: 'jurgensanclemente@gmail.com', message: email.comment },
    { 'headers': headers })
    .subscribe( response => {
      console.log( response );
    })
    

    this.mostrarChulo();
    this.ponerInfoFormulario();
  }


  mostrarChulo(){
    this.mostrar_chulo = true;
    setInterval( () => this.mostrar_chulo = false, 1000)
  }



}

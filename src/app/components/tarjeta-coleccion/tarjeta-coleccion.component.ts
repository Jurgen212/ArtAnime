import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-coleccion',
  templateUrl: './tarjeta-coleccion.component.html',
  styleUrls: ['./tarjeta-coleccion.component.css']
})
export class TarjetaColeccionComponent implements OnInit {

  constructor( private route: Router) { }

  ngOnInit(): void {
  }

  agua_click(){
    this.route.navigate(['/collections/agua']);
  }

  tierra_click(){
    this.route.navigate(['/collections/tierra']);
  }

  aire_click(){
    this.route.navigate(['/collections/aire']);
  }
}

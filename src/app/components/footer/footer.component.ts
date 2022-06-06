import { Component, OnInit } from '@angular/core';
import { SharedComponent } from '../shared/shared.component';

interface opcion {
  name: string,
  path: string
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(  ) { }
  ngOnInit(): void {
  }

  opciones: opcion[] = [
    { name: 'Colecciones'         , path: 'collections'     },
    { name: 'Figuras'             , path: 'home/personajes'},
    { name: 'Carrito'             , path: 'home/carrito'   },
    { name: 'Contacto'            , path: 'home/contacto'  }
  ]
}

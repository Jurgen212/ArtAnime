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

  integrantes = [
    { nombre: 'Jurgen Sanclemente', url: 'https://github.com/Jurgen212'     },
    { nombre: 'Sebastian Dosman'  , url: 'https://github.com/SebasDosman'   },
    { nombre: 'Nicolas Ramirez'   , url: 'https://github.com/Trompitas'     },
    { nombre: 'Juan Pablo Tascon' , url: 'https://github.com/juanpablotr14' },
    { nombre: 'Nicolas Gonazales' , url: ''  }
  ]

  opciones: opcion[] = [
    { name: 'Colecciones'         , path: 'collections'     },
    { name: 'Figuras'             , path: 'home/personajes'},
    { name: 'Carrito'             , path: 'home/carrito'   },
    { name: 'Contacto'            , path: 'home/contacto'  }
  ]
}

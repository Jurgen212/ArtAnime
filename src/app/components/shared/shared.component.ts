import { Component, OnInit } from '@angular/core';

interface opcion {
    name: string,
    path: string
}

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = {
    name: 'ArtAnime',
    img : './assets/title_principal.png'
  } 

  opciones: opcion[] = [
    { name: 'Colecciones'          , path: 'home/main-collections'      },
    { name: 'Buscar'               , path: 'home/personajes'            },
    { name: 'Carrito'              , path: 'home/carrito'               },
    { name: 'Próximamente'         , path: 'home/soon'                  },
    { name: 'Login'                 , path: 'home/login'                 },
    { name: 'Contacto'             , path: 'home/contacto'              }
  ]
}

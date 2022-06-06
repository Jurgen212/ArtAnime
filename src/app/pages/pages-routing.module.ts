import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { SoonComponent } from './soon/soon.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { CollectionsMainComponent } from './collections-main/collections-main.component';
import { CaracteristicasComponent } from '../components/caracteristicas/caracteristicas.component';
import { ReciboComponent } from './recibo/recibo.component';
import { RegistrarComponent } from './registrar/registrar.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'main'            , component : MainComponent           },
    { path: 'carrito'         , component : CarritoComponent        },
    { path: 'personajes'      , component : PersonajesComponent     },
    { path: 'soon'            , component : SoonComponent           },
    { path: 'contacto'        , component : ContactoComponent       },
    { path: 'login'           , component : LoginComponent          },
    { path: 'main-collections', component : CollectionsMainComponent},
    { path: 'caracteristicas' , component : CaracteristicasComponent},
    { path: 'recibo'          , component : ReciboComponent         },
    { path: 'registrar'       , component : RegistrarComponent      },
    { path: '**'              , redirectTo: 'main'                  }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

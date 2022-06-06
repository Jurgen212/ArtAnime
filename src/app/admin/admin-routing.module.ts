import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador/administrador.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';
import { EsconderComponent } from './esconder/esconder.component';
import { RegistroComponent } from './registro/registro.component';
import { StockComponent } from './stock/stock.component';
import { EscondidosComponent } from './escondidos/escondidos.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'principal' , component  : AdministradorComponent },
    { path: 'agregar'   , component  : AgregarComponent       },
    { path: 'editar'    , component  : EditarComponent        },
    { path: 'esconder'  , component  : EsconderComponent      },
    { path: 'stock'     , component  : StockComponent         },
    { path: 'registro'  , component  : RegistroComponent      },
    { path: 'ocultos'   , component  : EscondidosComponent    },
    { path: '**'        , redirectTo : 'principal'            } 
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

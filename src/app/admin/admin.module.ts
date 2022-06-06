import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdministradorComponent } from './administrador/administrador.component';
import { AgregarComponent } from './agregar/agregar.component';
import { EditarComponent } from './editar/editar.component';
import { EsconderComponent } from './esconder/esconder.component';
import { StockComponent } from './stock/stock.component';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorComponent } from '../components/buscador/buscador.component';
import { disponiblesPipe } from '../pipes/disponible.pipe';
import { EscondidosComponent } from './escondidos/escondidos.component';


@NgModule({
  declarations: [
    AdministradorComponent,
    AgregarComponent,
    disponiblesPipe,
    EditarComponent,
    EsconderComponent,
    StockComponent,
    BuscadorComponent,
    RegistroComponent,
    EscondidosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

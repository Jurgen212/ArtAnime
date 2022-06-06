import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { AguaComponent } from './agua/agua.component';
import { TierraComponent } from './tierra/tierra.component';
import { AireComponent } from './aire/aire.component';
import { CollectionsMainComponent } from '../pages/collections-main/collections-main.component';
import { TarjetaColeccionComponent } from '../components/tarjeta-coleccion/tarjeta-coleccion.component';



@NgModule({
  declarations: [
    AguaComponent,
    AireComponent,
    TierraComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule
  ]
})
export class CollectionsModule { }

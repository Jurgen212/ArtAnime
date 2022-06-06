import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { MainComponent } from './main/main.component';
import { SoonComponent } from './soon/soon.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SliderComponent } from '../components/slider/slider.component';
import { TarjetaColeccionComponent } from '../components/tarjeta-coleccion/tarjeta-coleccion.component';
import { LoginComponent } from './login/login.component';
import { CollectionsMainComponent } from './collections-main/collections-main.component';
import { TarjetasComponent } from '../components/tarjetas/tarjetas.component';
import { CaracteristicasComponent } from '../components/caracteristicas/caracteristicas.component';
import { ReciboComponent } from './recibo/recibo.component';
import { SoonPipe } from '../pipes/soon.pipe';
import { SoonCoomingComponent } from '../components/soon-cooming/soon-cooming.component';
import { RegistrarComponent } from './registrar/registrar.component';



@NgModule({
  declarations: [
    CarritoComponent,
    CaracteristicasComponent,
    ContactoComponent,
    MainComponent,
    PersonajesComponent,
    SoonComponent,
    SoonCoomingComponent,
    SoonPipe,
    TarjetaColeccionComponent,
    SliderComponent,
    LoginComponent,
    CollectionsMainComponent,
    TarjetasComponent,
    ReciboComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }

import { NgbPaginationNumber } from "@ng-bootstrap/ng-bootstrap";
import { TarjetaColeccionComponent } from './components/tarjeta-coleccion/tarjeta-coleccion.component';

export interface funko {
    _id:        string;
    name:       string;
    price:      number;
    material:   string;
    stock:      number;
    coleccion:  string;
    funkoImage: string;
    des       : string;
    __v:        number;
    promo?:     number;
    stars?:     number;
    nCa?:       number;  
}


export interface addFunko {
    name        : string;
    price       : string;
    material    : string;
    stock       : string;
    coleccion   : string;
    funkoImage  : string;
    des         : string;
    nCa        ?: string
}


export interface registroItem {
    name        : string;
    priceTotal  : number;
    material    : string;
    cantidadComprado: number;
    coleccion       : string;
    funkoImage      : string;
    nombreComprador : string;
    createdAt      ?: string;
}


export interface usuario{
    name            : string;
    mail            : string;
    contrasena      : string;
    contrasenaReal  : string;
    nameReal        : string;
    apellido        : string;
    direccion       : string;
}
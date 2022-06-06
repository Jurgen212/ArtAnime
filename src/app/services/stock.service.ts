import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { funko, addFunko, registroItem } from '../interface';




@Injectable({
  providedIn: 'root'
})
export class StockService {

  apiLink: string = environment.FUNKO_API_LINK;
  registerLink: string = environment.REGISTER_LINK;

  constructor( private http: HttpClient ) { }

  
  aguaArr   : funko[] = [];
  tierraArr : funko[] = [];
  aireArr   : funko[] = [];

  getAllFunkos(): Observable<funko[]>{
    return this.http.get<funko[]>( `${ this.apiLink }` );
  }

  getFunkoById( id: string ): Observable<funko[]>{
    return this.http.get<funko[]>(`${ this.apiLink }/${ id }`);
  }

  setFunko( funko: addFunko): Observable<addFunko >{
    return this.http.post<addFunko >( `${ this.apiLink }`, funko );
  }

  putFunko( funko: funko, id: string ): Observable<funko>{
    return this.http.put<funko>(`${ this.apiLink }/${ id }`, funko );
  }

  

  getRegister(): Observable<registroItem[]>{
    return this.http.get<registroItem[]>(`${ this.registerLink }`);
  }

  setRegister( datos: registroItem ): Observable<registroItem>{
    return this.http.post<registroItem>(`${ this.registerLink }`, datos );
  }


  getFunkosByName( dato: string ): Observable < funko[]>{
    return this.http.get<funko[]>(`${ this.apiLink }/${ dato }`);
  }

};

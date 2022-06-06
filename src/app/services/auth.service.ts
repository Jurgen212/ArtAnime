import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuth: boolean = false;

  esAutenticado(){
    
    if( localStorage.getItem('id') ){
      return true;
    }
    
    else{
      return false;
    }
    
  }
}

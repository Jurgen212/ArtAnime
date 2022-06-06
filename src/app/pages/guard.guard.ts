import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class GuardGuard implements  CanLoad, CanActivate {

  constructor( private authServ: AuthService, private router: Router ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if( this.authServ.esAutenticado()){
    
        return true; 
      }
      else{
        this.router.navigate(['./home/login']);
      
        return false;
      }
      
  }
  


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      if( this.authServ.esAutenticado() ){
      
        return true; 
      }
      else{
        this.router.navigate(['./home/login']);
        
        return false;
      }
      
  }
}

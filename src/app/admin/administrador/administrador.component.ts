import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  constructor( private router: Router, private authServ: AuthService ) { }

  ngOnInit(): void {
  }



  logout(){
    this.router.navigate(['./home/login']);
    this.authServ.isAuth = false;
    
    if( localStorage.getItem('id')){
      localStorage.removeItem('id');
    }
    
  }
}

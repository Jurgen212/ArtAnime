import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(  public router: Router ) { }

  ngOnInit(): void {
  }

  botonAire(){
    this.router.navigate(['collections/aire']);
  }

  botonAgua(){
    this.router.navigate(['collections/agua']);
  }

  botonTierra(){
    this.router.navigate(['collections/tierra']);
  }
}

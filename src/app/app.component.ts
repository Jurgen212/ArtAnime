import { Component } from '@angular/core';
import { StockService } from './services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'animeApp';

  constructor( ){}

  ngOnInit(): void {
  }
}

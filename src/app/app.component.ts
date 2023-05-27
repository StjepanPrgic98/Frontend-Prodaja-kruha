import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  baseUrl: string = "https://localhost:5001/api/"

  title = 'Prodaja kruha';
  products: any;

  constructor(private http: HttpClient){}

  ngOnInit()
  {
      this.http.get(this.baseUrl + "products").subscribe(
        {
          next: response => this.products = response,
          error: error => console.log(error),
          complete: () => {}
        })
  }

 
  
  
}

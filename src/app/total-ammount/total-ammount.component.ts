import { Component } from '@angular/core';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-total-ammount',
  templateUrl: './total-ammount.component.html',
  styleUrls: ['./total-ammount.component.css']
})
export class TotalAmmountComponent {
  totalOrders: any[] = [];

  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private orderService: OrderService){}

  ngOnInit() {
    this.GetTotalAmmountOfOrders();
  }

  GetTotalAmmountOfOrders()
  {
    this.orderService.GetTotalAmmountOfOrders().subscribe({
      next: response => {
        if (Array.isArray(response)) {
          this.totalOrders = response;    
          this.CalculateFullTotal(); 
        } else {
          console.error('Invalid response format. Expected an array.');
        }
      },
      error: error => console.log(error)
    });
    
  }

  CalculateFullTotal() {
      console.log("Before: " +this.totalQuantity);
      console.log("Before: " + this.totalPrice);
    for (let order of this.totalOrders) {
      this.totalQuantity += order.totalQuantity;
      this.totalPrice += order.totalPrice;
      console.log(this.totalQuantity);
      console.log(this.totalPrice);
    }
    
  }

}

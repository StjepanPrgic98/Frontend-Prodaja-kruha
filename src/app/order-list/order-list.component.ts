import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  orders: any;


  constructor(private orderService: OrderService){}

  ngOnInit() {
    this.orderService.GetOrders().subscribe(
      (response: any) => {
        this.orders = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  DeleteOrder(id: number)
  {
    this.orderService.DeleteOrder(id);
    console.log(id);
  }




 

}

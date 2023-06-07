import { Component } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-total-ammount',
  templateUrl: './total-ammount.component.html',
  styleUrls: ['./total-ammount.component.css']
})
export class TotalAmmountComponent {
  totalOrders: any[] = [];

  totalQuantity: number = 0;
  totalPrice: number = 0;

  dateOfOrders: string = "";
  orderDay: string = "";

  constructor(private orderService: OrderService, private toastr: ToastrService, private router: Router, private sharedService: SharedService){}

  ngOnInit() {
    if(this.orderService.GetOrderDate() == ""){this.router.navigateByUrl("/"); return;}
    this.GetTotalAmmountOfOrders();
    
  }

  GetTotalAmmountOfOrders()
  {
    this.orderService.GetTotalAmmountOfOrdersForTargetDate(this.orderService.GetOrderDate()).subscribe({
      next: response => {
        if (Array.isArray(response)) {
          this.totalOrders = response;    
          this.CalculateFullTotal(); 
          this.GetTargetDayAndDate();
        } else {
          console.error('Invalid response format. Expected an array.');
        }
      },
      error: error => this.toastr.error("Nije uspjelo!", "Upozorenje!")
    });
    
  }

  GetTargetDayAndDate()
  {
    this.dateOfOrders = this.orderService.GetOrderDate()
    this.orderDay = this.orderService.GetOrderDay()
  }

  CalculateFullTotal() {
    for (let order of this.totalOrders) {
      this.totalQuantity += order.totalQuantity;
      this.totalPrice += order.totalPrice;
    }
    
  }

}

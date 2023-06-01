import { Component, ViewChild } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { TotalAmmountComponent } from '../total-ammount/total-ammount.component';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { timeout } from 'rxjs';
import { SharedService } from '../_services/shared.service';
import { Order } from '../_models/order';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  @ViewChild(TotalAmmountComponent) totalComponent: TotalAmmountComponent | undefined;

  defaultDay: string = "Tuesday";
  targetDayChosen: string = "";
  croatianDay: string = "";
  orders: any;
  newOrder: boolean = false;
  deletedOrder: boolean = false;
  updatedOrder: boolean = false;
  completedOrder: boolean = false;
  dateOfOrders: string = "";
  orderDay: string = "";


  constructor(private orderService: OrderService, private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
    this.dateOfOrders = this.orderService.GetOrderDate()
    this.orderDay = this.orderService.GetOrderDay();
    this.newOrder = this.orderService.CheckForNewOrder();
    this.targetDayChosen = this.defaultDay;
    this.GetOrdersForTargetDate();
    this.orderService.RemoveNewOrder();
  }

  SetCroatianDay()
  {
    if(this.targetDayChosen == "Friday"){this.croatianDay = "Petak"}
    if(this.targetDayChosen == "Tuesday"){this.croatianDay = "Utorak"} 
  }

  GetOrders(targetDay: string) {
    this.orderService.GetOrdersForTargetDay(targetDay).subscribe(
      (response: any) => {
        this.orders = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  GetOrdersForTargetDate()
  {
    if(this.orderService.GetOrderDate() == ""){this.router.navigateByUrl("/")}
    this.orderService.GetOrdersForTargetDate(this.orderService.GetOrderDate()).subscribe(
      {
        next: response => {this.orders = response, this.dateOfOrders = this.orderService.GetOrderDate()},
        error: error => console.log(error)
      })
  }

  SetTargetDay(targetDay: string)
  {
    this.targetDayChosen = targetDay;
    this.orderService.GetOrdersForTargetDay(targetDay).subscribe(
      (response: any) => {
        this.orders = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.SetCroatianDay();
  }

  DeleteOrder(id: number) {
    this.orderService.DeleteOrder(id).subscribe({
      next: () => {
        this.GetOrdersForTargetDate();
        
      },
      error: error => console.log(error)
    });
    this.deletedOrder = true;
    this.ScrollToTop();
  }
  CompleteOrder(id: number)
  {
    this.orderService.CompleteOrder(id).subscribe(
      {
        next: () => this.GetOrdersForTargetDate(),
        error: error => console.log(error)
      });
    this.completedOrder = true;
    this.ScrollToTop();
  }
  
  UpdateOrder(id: number)
  {
    this.sharedService.SetOrderId(id);
    this.router.navigateByUrl("/orders/update/" + id);
  }

  CalculateOrders()
  {
    this.totalComponent?.GetTotalAmmountOfOrders();
  }

  alerts: any[] = [{
    type: 'success',
    msg: `Uspjesno! Nova narudzba dodana! (dodana: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  },
  {
    type: "danger",
    msg: `Narudzba je uspjesno obrisana! (obrisana: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  }];

  orderAddedAlert: any = 
  {
    type: "success",
    msg: `Uspjesno! Nova narudzba dodana! (dodano: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  }

  orderDeletedAlert: any = 
  {
    type: "danger",
    msg: `Narudzba je uspjesno obrisana! (obrisano: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  }
  orderCompletedAlert: any = 
  {
    type: "success",
    msg: `Uspjesno! Narudzba je zavrsena! (zavrseno: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  }
  orderUpdatedAlert: any = 
  {
    type: "warning",
    msg: `Stavke narudzbe uspjesno promjenjene! (promjenjeno: ${new Date().toLocaleTimeString()})`,
    timeout: 5000
  }

  
 
  add(): void {
    this.alerts.push({
      type: 'info',
      msg: `This alert will be closed in 5 seconds (added: ${new Date().toLocaleTimeString()})`,
      timeout: 5000
    });
  }
 
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    this.ResetAlerts();
  }

  ResetAlerts()
  {
    this.newOrder = false;
    this.deletedOrder = false;
    this.completedOrder = false;
    this.updatedOrder = false;
  }

  ScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
}

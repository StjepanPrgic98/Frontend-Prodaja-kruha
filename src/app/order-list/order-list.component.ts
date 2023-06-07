import { Component, TemplateRef, ViewChild } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { TotalAmmountComponent } from '../total-ammount/total-ammount.component';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { timeout } from 'rxjs';
import { SharedService } from '../_services/shared.service';
import { Order } from '../_models/order';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  noOrders: boolean = false;

  regularOrders: any;
  day: string = "";


  constructor(private orderService: OrderService,
     private sharedService: SharedService, 
     private router: Router, 
     private toastr: ToastrService,
     private modalService: BsModalService
     ) {}

  ngOnInit() {
    this.dateOfOrders = this.orderService.GetOrderDate()
    this.orderDay = this.orderService.GetOrderDay();
    this.newOrder = this.orderService.CheckForNewOrder();
    if(this.newOrder){this.toastr.success("Uspjesno! Nova narudzba dodana!")}
    this.targetDayChosen = this.defaultDay;
    this.GetOrdersForTargetDate(true);
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
        this.noOrders = true;
      }
    );
  }
  GetOrdersForTargetDate(resetAll: boolean)
  {
    if(this.orderService.GetOrderDate() == ""){this.router.navigateByUrl("/")}
    this.orderService.GetOrdersForTargetDate(this.orderService.GetOrderDate()).subscribe(
      {
        next: response => 
        {
          if(this.orders == undefined || resetAll == true)
          {
            this.orders = response, this.dateOfOrders = this.orderService.GetOrderDate(), console.log(response)
          }
          else
          {
            this.orders = this.orders.concat(response), this.dateOfOrders = this.orderService.GetOrderDate(), console.log(response)
          }
        },
        error: error => this.toastr.warning("Ovaj datum trenutno nema narudzbi!", "Dobro dosli!", {positionClass: "toast-top-center"})
      })
  }

  GetListOfRegularOrdersWithOption()
  {

    this.orderService.GetListOfRegularOrdersWithOptions().subscribe(
      {
        next: response => {
          if (this.orders === undefined) {
            this.orders = response; 
          } else {
            this.orders = this.orders.concat(response); 
          }
          this.toastr.success("Redovne narudzbe dodane!", "Uspjesno!");
        },
        error: error => this.toastr.error("Redovne narudzbe nisu dohvacene!", "Upozorenje!")
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
        this.GetOrdersForTargetDate(true);
        this.toastr.error("Narudzba je uspjesno obrisana!")
      },
      error: error => this.toastr.error("Upozorenje! Narudzba nije uspjesno obrisana!")
    });
    //this.deletedOrder = true;
    //this.ScrollToTop();
  }
  CompleteOrder(event: Event, id: number)
  {
    event.stopPropagation();
    this.orderService.CompleteOrder(id).subscribe(
      {
        next: () => {this.GetOrdersForTargetDate(true), this.toastr.success("Narudžba zavrsena!", "Uspješno")},
        error: error => this.toastr.error("Narudzba nije uspjesno zavrsena!", "Upozorenje")
      });
    //this.completedOrder = true;
    //this.ScrollToTop();
  }

  MarkAsNotSold(id: number)
  {
    this.orderService.MarkAsNotSold(id).subscribe(
      {
        next: () => {this.GetOrdersForTargetDate(true), this.toastr.warning("Narudžba je označena kao ne prodana!", "Pažnja")},
        error: error => this.toastr.error("Nije uspjelo!", "Upozorenje!")
      });
  }
  
  UpdateOrder(id: number)
  {
    this.sharedService.SetOrderId(id);
    this.router.navigateByUrl("/orders/update/" + id);
  }

  SetOrderProperty(orderId: number, property: string)
  {
    this.orderService.SetOrderProperty(orderId, property).subscribe(
      {
        next: response => {this.GetOrdersForTargetDate(true), this.toastr.success("Nova regularna narudzba dodana!", "Uspjesno!")},
        error: error => this.toastr.error("Narudzba nije postavljena kao regularna!", "Upozorenje!")
      })
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

  modalRef?: BsModalRef;
  message?: string;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }
  
}

import { Component, TemplateRef } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { SharedService } from '../_services/shared.service';
import { Order } from '../_models/order';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService, ModalDirective, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-order-property',
  templateUrl: './order-property.component.html',
  styleUrls: ['./order-property.component.css']
})
export class OrderPropertyComponent {

  orders: any;
  property: string = "Regular";
  regularDayText: string = "Utorak|Petak"

  constructor(private orderService: OrderService, private sharedService: SharedService, 
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService
    ){}

  ngOnInit()
  {
   // if(this.orderService.GetOrderDate() == ""){this.router.navigateByUrl("/"); return;}
    this.GetListOfRegularOrders();
  }

  GetListOfRegularOrders()
  {
    this.orderService.GetOrdersWithPropertyRegular().subscribe(
      {
        next: response => this.orders = response,
        error: error => this.toastr.error("Narudzbe nisu dohvacene!", "Upozorenje!")
      })
  }
  
  SetOrderProperty(orderId: number, property: string)
  {
    this.orderService.SetOrderProperty(orderId, property).subscribe(
      {
        next: response => {this.toastr.success("Nova regularna narudzba dodana!", "Uspjesno!"), this.GetListOfRegularOrders()},
        error: error => this.toastr.error("Narudzba nije postavljena kao regularna!", "Upozorenje!")
      })
  }

  DeleteOrder(id: number) {
    this.orderService.DeleteOrder(id).subscribe({
      next: () => {
        
        this.toastr.error("Narudzba je uspjesno obrisana!"),
        this.GetListOfRegularOrders();
      },
      error: error => this.toastr.error("Upozorenje! Narudzba nije uspjesno obrisana!")
    });
    //this.deletedOrder = true;
    //this.ScrollToTop();
  }
  UpdateOrder(id: number)
  {
    this.sharedService.SetOrderId(id);
    this.router.navigateByUrl("/orders/update/" + id);
  }

  SetPropertyValue(propertyArgument: string, day: string)
  {
    this.property = propertyArgument;
    this.regularDayText = day;
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

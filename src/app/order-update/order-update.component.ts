import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { OrderItem } from '../_models/OrderItem';
import { Order } from '../_models/order';
import { OrderService } from '../_services/order.service';
import { ProductService } from '../_services/product.service';
import { SharedService } from '../_services/shared.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';


@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent {

  orderToUpdate: any;



  customerName: string = "";
  numberOfOrderedProduct: number[] = [0,0,0,0,0,0];
  productTypes: string[] = ["", "", "", "", ""]
  targetDayChosen: string = "";
  orderItems: OrderItem[] = [];
  order: Order | undefined;


  products: any;

  isCustomerNameNull: boolean = false;
  areProductItemsNull: boolean = false;
  isTargetDayNull: boolean = false;
  abortOrder: boolean = false;

  timesAdded: number = 0;
  dontReduce: boolean = false;

  

  constructor(private productService: ProductService,
     private orderService: OrderService, private router: Router, 
     private sharedService: SharedService,
     private modalService: BsModalService,
     private location: Location     
     ){}
  ngOnInit()
  {
    if(this.orderService.GetOrderDate() == "" && this.sharedService.GetOrderId() == 0){this.router.navigateByUrl("/"); return;}
    this.GetProducts(); 
    this.SetCroatianDay();
  }

  GetOrder()
  {
    this.orderService.GetOrderById(this.sharedService.GetOrderId()).subscribe(
      {
        next: response => 
        {
          this.orderToUpdate = response;
          this.customerName = this.orderToUpdate.customerName,
          this.targetDayChosen = this.orderToUpdate.targetDay,
          this.FillArrays()
        },
        error: error => console.log(error)
      })
  }

  FillArrays()
  {   
    for (let i = 0; i < this.products.length; i++)
    {
      this.productTypes[i+1] = this.products[i].type;
    }
    for (let i = 0; i < this.orderToUpdate.orderItems.length; i++)
    {
      for (let j = 0; j < this.productTypes.length+1; j++)
      {
        if(this.productTypes[j] == this.orderToUpdate.orderItems[i].productType)
        {
          this.numberOfOrderedProduct[j] = this.orderToUpdate.orderItems[i].quantity
          this.timesAdded += this.orderToUpdate.orderItems[i].quantity
        }
      }
      
      
    }
    
  }

  UpdateOrder(id: number)
  {
    this.CheckIfOrderIsCorrect();
    if(this.abortOrder){return;}
    this.SortArrays(); 
    for (let i = 0; i < this.productTypes.length; i++)
    {
      const orderItem:  OrderItem =
      {
        ProductType: this.productTypes[i],
        Quantity: this.numberOfOrderedProduct[i]
      }
      this.orderItems[i] = orderItem;
    }
    
    const newOrder: Order = 
    {
      CustomerName: this.customerName,
      OrderItems: this.orderItems,
      TargetDay: this.targetDayChosen,
      TargetDate: this.orderService.GetOrderDate()
    }
    this.order = newOrder;
    this.PutRequest(this.order, id)
  }

  PutRequest(order: Order, id: number)
  {
    this.orderService.UpdateOrder(order, id).subscribe(
      {
        next: () => this.goBack(),
        error: error => console.log(error)
      })
  }

  GetProducts()
  {
    if(this.sharedService.GetProducts() != null){this.products = this.sharedService.GetProducts(); this.GetOrder(); return;}
    this.productService.GetProducts().subscribe(
      {
        next: response => {this.products = response, this.GetOrder(), this.sharedService.SetProducts(response)},
        error: error => console.log(error)
      })
  }

  GoToOrderProperty()
  {
    this.router.navigateByUrl("/orders/property");
    return;
  }


  IncreaseNumber(id: number, type: string)
  {
    for (let i = 0; i < 5; i++)
    {
      if(i == id)
      {
        this.numberOfOrderedProduct[i]++;
        this.productTypes[i] = type;
      }
      
    }
    this.timesAdded++;
    console.log(this.timesAdded);
  
  }
  DecreaseNumber(id: number, type: string)
  {
    for (let i = 0; i < 5; i++)
    {
      if(i == id)
      {
        if(this.numberOfOrderedProduct[i] <= 0){this.numberOfOrderedProduct[i] = 0;}
        else
        {
          this.numberOfOrderedProduct[i]--;
          this.productTypes[i] = type;
        }
      }
    }
    this.timesAdded--;
    console.log(this.timesAdded);
    
  }

  SetTargetDay(targetDay: string)
  {
    this.targetDayChosen = targetDay;
  }


  SortArrays()
  {
    for (let i = 0; i < 5; i++)
    {
      if(this.numberOfOrderedProduct[i] == 0)
      {
        this.productTypes[i] = "";
      }
    }
    this.numberOfOrderedProduct = this.numberOfOrderedProduct.filter(x => x !== 0)
    this.numberOfOrderedProduct = this.numberOfOrderedProduct.filter(x => x !== undefined)
    this.productTypes = this.productTypes.filter(x => x !== "");
    this.productTypes = this.productTypes.filter(x => x !== undefined);
  }

  CheckIfOrderIsCorrect()
  {
    this.ResetAlerts();
    if(this.customerName == null || this.customerName == undefined || this.customerName == ""){this.isCustomerNameNull = true; this.abortOrder = true; this.ScrollToTop()}
    if(this.targetDayChosen == null || this.targetDayChosen == undefined || this.targetDayChosen == ""){this.isTargetDayNull = true; this.abortOrder = true; this.ScrollToTop()}
    if(this.timesAdded <= 0){this.areProductItemsNull = true, this.abortOrder = true; this.ScrollToTop()}
  }

  SetCroatianDay()
  {
    console.log(this.orderService.GetOrderDay())
    if(this.orderService.GetOrderDay() == "Petak")
    {
      this.targetDayChosen = "Friday"
    }
    else if(this.orderService.GetOrderDay() == "Utorak")
    {
      this.targetDayChosen = "Tuesday"
    }
  }
  goBack() {
    this.location.back();
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

  customerNameNull: any = 
  {
    type: "danger",
    msg: `Upozorenje! Ime kupca nije uneseno!`,
    timeout: 5000
  }
  productsNull: any = 
  {
    type: "danger",
    msg: `Upozorenje! Nijedan proizvod nije izabran!`,
    timeout: 5000
  }
  targetDayNull: any = 
  {
    type: "danger",
    msg: `Upozorenje! Dan nije izabran`,
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

  ScrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ResetAlerts()
  {
      this.isCustomerNameNull = false;
      this.isTargetDayNull = false;
      this.areProductItemsNull = false;
      this.abortOrder = false;
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



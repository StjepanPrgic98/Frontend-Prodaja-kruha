import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { OrderItem } from '../_models/OrderItem';
import { Order } from '../_models/order';
import { Product } from '../_models/Product';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { OrderService } from '../_services/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../_services/shared.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent {

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

  

  constructor(private productService: ProductService,
     private orderService: OrderService, private router: Router, 
     private toastr: ToastrService, private sharedService: SharedService,
     private sanitizer: DomSanitizer){}

  ngOnInit()
  {
    if(this.orderService.GetOrderDate() == ""){this.router.navigateByUrl("/"); return;}
    this.GetProducts();
    this.SetCroatianDay()
  }

  CreateOrder()
  {
    console.log("Current date chosen: " + this.orderService.GetOrderDate())
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
    this.PostRequest(this.order)
  }

  PostRequest(order: Order)
  {
    this.orderService.CreateOrder(order).subscribe(
      {
        next: () => {this.router.navigateByUrl("/orders")},
        error: error => this.toastr.error("Narudzba nije spremljena!", "Upozorenje!")
      })
  }

  GetProducts()
  {
    if(this.sharedService.GetProducts() != null){this.products = this.sharedService.GetProducts(); return;}
    this.productService.GetProducts().subscribe(
      {
        next: response => {this.products = response, this.sharedService.SetProducts(response)},
        error: error => console.log(error)
      })
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
  
  }
  DecreaseNumber(id: number, type: string)
  {
    for (let i = 0; i < 5; i++)
    {
      if(i == id)
      {
        this.numberOfOrderedProduct[i]--;
        this.productTypes[i] = type;
      }
    }
    this.timesAdded--;
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
    if(this.customerName == null || this.customerName == undefined || this.customerName == ""){ this.abortOrder = true; this.toastr.error("Ime kupca nije uneseno!", "Upozorenje!", {positionClass: "toast-top-center"})}
    if(this.targetDayChosen == null || this.targetDayChosen == undefined || this.targetDayChosen == ""){this.isTargetDayNull = true; this.abortOrder = true; this.ScrollToTop()}
    if(this.timesAdded <= 0){this.abortOrder = true, this.toastr.error("Proizvodi nisu uneseni!", "Upozorenje", {positionClass: "toast-top-center"})}
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

  getFullImageUrl(relativePath: string): SafeUrl {
    const baseUrl = "https://localhost:5001/api/"
    const imageUrl = `${baseUrl}/${relativePath}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
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

  

}

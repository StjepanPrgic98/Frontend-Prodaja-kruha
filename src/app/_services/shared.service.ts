import { Injectable } from '@angular/core';
import { Order } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  orderId: number = 0;
  products: any;

  public SetProducts(productsArgument: any){this.products = productsArgument}
  public GetProducts(){return this.products}
  
    
  

  public SetOrderId(orderId: number){this.orderId = orderId}
  public GetOrderId(){return this.orderId}
}

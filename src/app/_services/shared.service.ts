import { Injectable } from '@angular/core';
import { Order } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  orderId: number = 0;

  public SetOrderId(orderId: number){this.orderId = orderId}
  public GetOrderId(){return this.orderId}
}

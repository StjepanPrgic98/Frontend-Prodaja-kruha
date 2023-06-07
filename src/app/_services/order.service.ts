import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../_models/order';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = "https://localhost:5001/api/";

  url: string = ""

  newOrder: boolean = false;
  orderDate: string = "";
  orderDay: string = "";
  englishDay: string = ""

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public GetOrders(): Observable<any> {
    return this.http.get(this.baseUrl + "orders");
  }
  public GetOrderById(id: number): Observable<any>
  {
    return this.http.get(this.baseUrl + "orders/id/" + id);
  }
  public GetOrdersForTargetDay(targetDay: string): Observable<any>
  {
    return this.http.get(this.baseUrl + "orders/targetDay/" + targetDay)
  }
  public GetOrdersForTargetDate(date: string): Observable<any>
  {
    return this.http.get(this.baseUrl + "orders/date/" + date)
  }

  public GetTotalAmmountOfOrders(): Observable<any>
  {
    return this.http.get(this.baseUrl + "orders/totalAmmount");
  }
  public GetTotalAmmountOfOrdersForTargetDate(date: string): Observable<any>
  {
    return this.http.get(this.baseUrl + "orders/totalAmmount/" + date);
  }

  public DeleteOrder(id: number): Observable<any>
  {
      return this.http.delete(this.baseUrl + "orders/delete/" + id);   
  }
  public CompleteOrder(id: number): Observable<any>
  {
    return this.http.patch(this.baseUrl + "orders/complete/" + id, {});
  }

  public MarkAsNotSold(id: number): Observable<any>
  {
    return this.http.patch(this.baseUrl + "orders/notSold/" + id, {});
  }

  public CreateOrder(order: Order): Observable<any>
  {
    this.newOrder = true;
    return this.http.post(this.baseUrl + "orders/create/", order);
  }

  public UpdateOrder(order: Order, id: number): Observable<any>
  {
    return this.http.put(this.baseUrl + "orders/update/" + id, order);
  }
  public SetOrderProperty(orderId: number, property: string): Observable<any>
  {
    return this.http.patch(this.baseUrl + "orders/property/" + orderId + "/" + property, {})
  }
  public GetOrdersWithPropertyRegular(): Observable<any>
  {
    return this.http.get(this.baseUrl + "orders/listOfRegularOrders")
  }
  public GetListOfRegularOrdersWithOptions(): Observable<any>
  {
    if(this.orderDay == "Petak"){this.englishDay = "Friday"}
    if(this.orderDay == "Utorak"){this.englishDay = "Tuesday"}
    this.url = this.baseUrl + "orders/listOfRegularOrders/" + this.englishDay + "Regular/" + this.orderDate + "/" + this.englishDay
    console.log(this.url);
    return this.http.post(this.baseUrl + "orders/listOfRegularOrders/" + this.englishDay + "Regular/" + this.orderDate + "/" + this.englishDay, {})
  }


  public RemoveNewOrder()
  {
    this.newOrder = false;
  }

  public CheckForNewOrder()
  {
    return this.newOrder;
  }
  public SetOrderDate(date: string, day: string)
  {
    this.orderDate = date
    this.orderDay = day
  }
  public GetOrderDate()
  {
    return this.orderDate
  }
  public GetOrderDay()
  {
    return this.orderDay;
  }

  
  
}

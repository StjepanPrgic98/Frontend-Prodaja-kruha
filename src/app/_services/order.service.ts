import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = "https://localhost:5001/api/";

  constructor(private http: HttpClient) { }

  public GetOrders(): Observable<any> {
    return this.http.get(this.baseUrl + "orders");
  }
  public GetOrdersForTargetDay(targetDay: string): Observable<any>
  {
    return this.http.get(this.baseUrl + "orders/targetDay/" + targetDay)
  }

  public GetTotalAmmountOfOrders(): Observable<any>
  {
    return this.http.get(this.baseUrl + "orders/totalAmmount");
  }

  public DeleteOrder(id: number): Observable<any>
  {
      return this.http.delete(this.baseUrl + "orders/delete/" + id);   
  }
  public CompleteOrder(id: number): Observable<any>
  {
    return this.http.patch(this.baseUrl + "orders/complete/" + id, {});
  }
  
}

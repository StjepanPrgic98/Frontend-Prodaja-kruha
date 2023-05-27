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
}
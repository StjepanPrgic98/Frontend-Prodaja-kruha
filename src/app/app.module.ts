import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { OrderListComponent } from './order-list/order-list.component';
import { TotalAmmountComponent } from './total-ammount/total-ammount.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OrderListComponent,
    TotalAmmountComponent,
    OrdersPageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

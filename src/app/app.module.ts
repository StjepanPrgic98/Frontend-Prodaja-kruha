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
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AlertModule } from 'ngx-bootstrap/alert';
import { StatsComponent } from './stats/stats.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { MainCalenderComponent } from './main-calender/main-calender.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { OrdersNavComponent } from './orders-nav/orders-nav.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { OrderPropertyComponent } from './order-property/order-property.component';
import { IngredientsPageComponent } from './ingredients-page/ingredients-page.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { IngredientsUsedComponent } from './ingredients-used/ingredients-used.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    OrderListComponent,
    TotalAmmountComponent,
    OrdersPageComponent,
    StatsComponent,
    OrderCreateComponent,
    OrderUpdateComponent,
    MainCalenderComponent,
    OrdersNavComponent,
    OrderPropertyComponent,
    IngredientsPageComponent,
    IngredientsUsedComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AccordionModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    ToastrModule.forRoot(
      {
        positionClass: "toast-bottom-right",
        timeOut: 5000,
        progressBar: true,
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

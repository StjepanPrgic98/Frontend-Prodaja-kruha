import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { OrderListComponent } from './order-list/order-list.component';
import { StatsComponent } from './stats/stats.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { MainCalenderComponent } from './main-calender/main-calender.component';

const routes: Routes = 
[
  {path: "", component: MainCalenderComponent},
  {path: "orders", component: OrderListComponent},
  {path: "orders/create", component: OrderCreateComponent},
  {path: "orders/update/:id", component: OrderUpdateComponent},
  {path: "stats", component: StatsComponent},
  {path: "**", component: OrdersPageComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

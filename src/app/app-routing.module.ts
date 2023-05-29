import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { OrderListComponent } from './order-list/order-list.component';
import { StatsComponent } from './stats/stats.component';
import { OrderCreateComponent } from './order-create/order-create.component';

const routes: Routes = 
[
  {path: "", component: OrdersPageComponent},
  {path: "orders", component: OrderListComponent},
  {path: "orders/create", component: OrderCreateComponent},
  {path: "stats", component: StatsComponent},
  {path: "**", component: OrdersPageComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

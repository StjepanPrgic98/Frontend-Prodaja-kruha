import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { OrderListComponent } from './order-list/order-list.component';
import { StatsComponent } from './stats/stats.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { MainCalenderComponent } from './main-calender/main-calender.component';
import { TotalAmmountComponent } from './total-ammount/total-ammount.component';
import { OrderPropertyComponent } from './order-property/order-property.component';
import { IngredientsPageComponent } from './ingredients-page/ingredients-page.component';
import { IngredientsUsedComponent } from './ingredients-used/ingredients-used.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = 
[
  {path: "", component: MainCalenderComponent},
  {path: "orders", component: OrderListComponent},
  {path: "orders/create", component: OrderCreateComponent},
  {path: "orders/update/:id", component: OrderUpdateComponent},
  {path: "orders/info", component: TotalAmmountComponent},
  {path: "orders/property", component: OrderPropertyComponent},
  {path: "ingredients/list", component: IngredientsPageComponent},
  {path: "ingredients/ingredientsUsed", component: IngredientsUsedComponent},
  {path: "stats", component: StatsComponent},
  {path: "products/list", component: ProductsListComponent},
  {path: "**", component: OrdersPageComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

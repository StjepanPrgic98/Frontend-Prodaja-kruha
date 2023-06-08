import { Component } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedService } from '../_services/shared.service';
import { IngredientService } from '../_services/ingredient.service';

@Component({
  selector: 'app-total-ammount',
  templateUrl: './total-ammount.component.html',
  styleUrls: ['./total-ammount.component.css']
})
export class TotalAmmountComponent {
  totalOrders: any[] = [];
  totalIngredients: any;
  totalPrice: number = 0;
  totalMoneyGained: number = 0;
  totalProfit: number = 0;
  

  dateOfOrders: string = "";
  orderDay: string = "";

  constructor(private orderService: OrderService, private toastr: ToastrService, 
    private router: Router, private sharedService: SharedService,
    private ingredientService: IngredientService){}

  ngOnInit() {
    if(this.orderService.GetOrderDate() == ""){this.router.navigateByUrl("/"); return;}
    this.GetTotalAmmountOfOrders();
    
  }

  GetTotalAmmountOfOrders()
  {
    this.orderService.GetTotalAmmountOfOrdersForTargetDate(this.orderService.GetOrderDate()).subscribe(
      {
        next: response => {this.totalOrders = response, console.log(response), this.GetTargetDayAndDate(), this.GetTotalAmmountOfIngredients()},
        error: () => this.toastr.error("Dohvacanje proizvoda nije uspjelo!", "Upozorenje!")
      })
    
  }

  GetTotalAmmountOfIngredients()
  {
    this.ingredientService.GetTotalAmmountOfIngredientsForTargetDate(this.orderService.GetOrderDate()).subscribe(
      {
        next: response => {this.totalIngredients = response, console.log(response), this.CalculateTotalPrice(), this.CalculateTotalMoneyGained()},
        error: () => this.toastr.error("Dohvacanje sastojaka nije uspjelo!", "Upozorenje!")
      })
  }

  GetTargetDayAndDate()
  {
    this.dateOfOrders = this.orderService.GetOrderDate()
    this.orderDay = this.orderService.GetOrderDay()
  }

  CalculateTotalPrice() {
    this.totalPrice = 0;
    for (let i = 0; i < this.totalIngredients.length; i++) {
      this.totalPrice += this.totalIngredients[i].totalIngredientPrice;
    }
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2)); // Format total price with 2 decimal places
    console.log("Total ingredient price: " + this.totalPrice);
  }

  CalculateTotalMoneyGained()
  {
    this.totalMoneyGained = 0
    this.totalProfit = 0
    for (let i = 0; i < this.totalOrders.length; i++)
    {
      this.totalMoneyGained += this.totalOrders[i].totalPrice
    }
    console.log("Total money: " + this.totalMoneyGained)
    this.totalProfit = this.totalMoneyGained - this.totalPrice
    console.log("Profit: " + this.totalProfit)
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IngredientService } from '../_services/ingredient.service';
import { OrderService } from '../_services/order.service';
import { ProductService } from '../_services/product.service';
import { IngredientInfo } from '../_models/IngredientInfo';
import { FullPrice } from '../_models/FullPrice';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  constructor(
    private orderService: OrderService,
    private ingredientService: IngredientService,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService,
    private modalService: BsModalService
  ){}

  products: any;
  productType: string = "Veliki";
  productWeight: number = 1500;
  ingredients: any;
  
  productsWithIngredientsAndPrices: any;

  fullPriceOfIngredients: number = 0;

  fullPrice: FullPrice = {ProductType: "", Price: 0}

  

  ngOnInit() {
    this.GetProducts();
  }


  

  GetProducts() {
    this.productService.GetProducts().subscribe({
      next: response => {
        this.products = response;
        this.GetProductsWithIngredientsAndPrices()
      },
      error: () => this.toastr.error("Proizvodi nisu dohvaćeni!", "Upozorenje!")
    });
  }

  GetProductsWithIngredientsAndPrices()
  {
    this.ingredientService.GetProductsWithIngredientsAndPrices().subscribe(
      {
        next: response => {this.productsWithIngredientsAndPrices = response, console.log(response)}
      })
  }

  

  GetIngredients()
  {
    this.ingredientService.GetAllIngredients().subscribe(
      {
        next: response => {this.ingredients = response, console.log(response)},
        error: () => this.toastr.error("Nesto je poslo po zlu!", "Upozorenje!")
      })
  }

  

  SetProductTypeAndWeight(type: string, weight: number) {
    this.productType = type;
    this.productWeight = weight;
  }

 

  
   
  
    
  


  
 
  

}

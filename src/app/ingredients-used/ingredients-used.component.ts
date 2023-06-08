import { Component, TemplateRef } from '@angular/core';
import { OrderService } from '../_services/order.service';
import { IngredientService } from '../_services/ingredient.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../_services/product.service';
import { IngredientInfo } from '../_models/IngredientInfo';
import { IngredientsUsed } from '../_models/IngredientsUsed';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ingredients-used',
  templateUrl: './ingredients-used.component.html',
  styleUrls: ['./ingredients-used.component.css']
})
export class IngredientsUsedComponent {
  products:any;
  ingredients: any;
  productType: string = "Veliki"
  editIndex: number = -1;

  ingredientInfos: IngredientInfo[] = [];
  newIngredientInfo: IngredientInfo = { IngredientType: '', IngredientPercentage: 0 };
  ingredientsUsed: IngredientsUsed = {ProductType: "", IngredientTypes: []}

  editing: boolean = false;

  constructor(private orderService: OrderService, private ingredientService: IngredientService, private router: Router,
    private toastr: ToastrService, private productService: ProductService,
    private modalService: BsModalService
    
    ){}

  ngOnInit()
  {
    this.GetProducts()
  }

  GetProducts()
  {
    this.productService.GetProducts().subscribe(
      {
        next: response => {this.products = response, this.GetIngredients()},
        error: () => this.toastr.error("Nije uspjelo dohvacanje proizvoda!", "Upozorenje!")
      })
  }

  GetIngredients()
  {
    this.ingredientService.GetAllIngredients().subscribe(
      {
        next: response => this.ingredients = response,
        error: () => this.toastr.error("Nije uspjelo dohvacanje sastojaka!", "Upozorenje!")   
      })
  }


  SetProductType(type: string)
  {
    this.productType = type;
  }

  addNewIngredient() {
    if (this.newIngredientInfo.IngredientType && this.newIngredientInfo.IngredientPercentage) {
      if (this.editIndex > -1) {
        // Edit existing ingredient
        this.ingredientInfos[this.editIndex] = { ...this.newIngredientInfo };
        this.editIndex = -1;
      } else {
        // Add new ingredient
        this.ingredientInfos.push({ ...this.newIngredientInfo });
      }
      this.newIngredientInfo.IngredientType = '';
      this.newIngredientInfo.IngredientPercentage = 0;
    }
    console.log(this.ingredientInfos)
  }
  

  editIngredient(index: number) {
    this.newIngredientInfo = { ...this.ingredientInfos[index] };
    this.editIndex = index;
  
    if (index !== this.ingredientInfos.length - 1) {
      this.newIngredientInfo.IngredientType = '';
      this.newIngredientInfo.IngredientPercentage = 0;
    }
  
    console.log(this.ingredientInfos);
  }
  
  

  deleteIngredient(index: number) {
    this.ingredientInfos.splice(index, 1);
    if (this.editIndex === index) {
      this.newIngredientInfo = { IngredientType: '', IngredientPercentage: 0 };
      this.editIndex = -1;
    }
    console.log(this.ingredientInfos)
  }

  CreateNewIngredientsUsedList()
  {
    this.ingredientsUsed = 
    {
      ProductType: this.productType,
      IngredientTypes: this.ingredientInfos
    }
    console.log(this.ingredientsUsed)
    this.LinkIngredientsToProduct(this.ingredientsUsed)
  }

  LinkIngredientsToProduct(ingredientsUsed: IngredientsUsed)
  {
    this.ingredientService.LinkIngredientsToProduct(ingredientsUsed).subscribe(
      {
        next: response => {console.log(response), this.toastr.success("Smjesa dodana!", "Uspjesno!")},
        error: () => this.toastr.error("Dodavanje smjese nije uspjelo!", "Upozorenje!")
      })
  }

  SetEditing()
  {
    this.editing = !this.editing;
  }

  modalRef?: BsModalRef;
  message?: string;

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef?.hide();
  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef?.hide();
  }

}

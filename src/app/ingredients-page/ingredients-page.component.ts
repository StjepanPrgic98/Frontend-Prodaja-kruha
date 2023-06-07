import { Component, TemplateRef } from '@angular/core';
import { IngredientService } from '../_services/ingredient.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Ingredient } from '../_models/Ingredient';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-ingredients-page',
  templateUrl: './ingredients-page.component.html',
  styleUrls: ['./ingredients-page.component.css']
})
export class IngredientsPageComponent {

  ingredients: any;
  isCollapsed = true;
  editingIngredient: boolean = false;
  

  ingredient: Ingredient = {
    Id: 0,
    IngredientType: '',
    IngredientPackageWeight: 0,
    IngredientPrice: 0
  };

  constructor(private ingredientService: IngredientService, private toastr: ToastrService,
     private router: Router,
     private modalService: BsModalService){}

  ngOnInit()
  {
    this.GetListOfIngredients()
  }

  GetListOfIngredients()
  {
    this.ingredientService.GetAllIngredients().subscribe(
      {
        next: response => {this.ingredients = response, console.log(response)},
        error: error => this.toastr.error("Sastojci nisu dohvaceni!", "Upozorenje!")
      })
  }

  Calculate1kgPrice(price: number, weight: number)
  {
    const pricePerKg = (price / weight) * 1000;
    return pricePerKg.toFixed(2);
  }

  CreateIngredient()
  {
    console.log(this.ingredient)
    this.ingredientService.CreateIngredient(this.ingredient).subscribe(
      {
        next: () => {this.GetListOfIngredients(), this.toastr.success("Novi sastojak dodan!", "Uspjesno!"), this.isCollapsed = true;},
        error: () => this.toastr.error("Dodavanje sastojka nije uspjelo!", "Upozorenje!")
      })
  }

  DeleteIngredient(id: number)
  {
    this.ingredientService.DeleteIngredient(id).subscribe(
      {
        next: () => {this.GetListOfIngredients(), this.toastr.error("Sastojak je uspjesno obrisan!", "Uspjesno!")},
        error: () => this.toastr.error("Sastojak nije obrisan!", "Upozorenje!")
      })
  }

  EditIngredient(type: string, weight: number, price: number, id: number)
  {
    this.editingIngredient = true;
    this.ingredient = 
    {
      Id: id,
      IngredientType: type,
      IngredientPackageWeight: weight,
      IngredientPrice: price
    }
    this.isCollapsed = false;
    console.log(this.ingredient);
  }

  Update()
  {
    this.UpdateIngredient(this.ingredient);
  }

  UpdateIngredient(ingredient: Ingredient)
  {
    this.ingredientService.UpdateIngredient(ingredient).subscribe(
      {
        next: () => {this.GetListOfIngredients(), this.toastr.success("Stavke sastojka promjenjene!", "Uspjesno!"), this.isCollapsed = true, this.editingIngredient = false},
        error: () => this.toastr.error("Stavke sastojka nisu promjenjene!", "Upozorenje!")
      })
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';
import { IngredientsUsed } from '../_models/IngredientsUsed';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "https://localhost:5001/api/";

  public GetAllIngredients(): Observable<any>
  {
    return this.http.get(this.baseUrl + "ingredients/ingredientsList")
  }

  public CreateIngredient(ingredient: Ingredient): Observable<any>
  {
    return this.http.post(this.baseUrl + "ingredients/create", ingredient);
  }

  public DeleteIngredient(id: number): Observable<any>
  {
    return this.http.delete(this.baseUrl + "ingredients/delete/" + id);
  }

  public UpdateIngredient(ingredient: Ingredient): Observable<any>
  {
    return this.http.post(this.baseUrl + "ingredients/update", ingredient);
  }

  public LinkIngredientsToProduct(ingredientsUsed: IngredientsUsed): Observable<any>
  {
    return this.http.post(this.baseUrl + "ingredients/linkIngredientsToProduct", ingredientsUsed);
  }
}

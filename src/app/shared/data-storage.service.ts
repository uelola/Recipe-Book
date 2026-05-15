import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataSorageService {
  constructor(
    private http: HttpClient,
    private RecipeService: RecipeService,
  ) {}

  storeRecipes() {
    const recipes = this.RecipeService.getRecipes();
    this.http
      .put(
        'https://recipes-ef6d3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes,
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<
        Recipe[]
      >('https://recipes-ef6d3-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => this.RecipeService.setRecipes(recipes)),
      );
  }
}

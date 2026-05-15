import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs-compat';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Crispy Rice Paper Dumplings',
  //     'These rice crispy paper dumplings.',
  //     'https://onehappybite.com/wp-content/uploads/2024/04/DSC00595-2.jpg',
  //     [new Ingredient('Rice Paper', 10), new Ingredient('Ground Chicken', 200)],
  //   ),
  //   new Recipe(
  //     'Low Carb Chicken Stew',
  //     'Tasty keto meal prep for the week.',
  //     'https://www.shopflavcity.com/cdn/shop/articles/low-carb-chicken-stew-keto-cauliflower-rice-1.jpg?v=1759303140&width=720',
  //     [new Ingredient('Chicken', 300), new Ingredient('Cauliflower Rice', 100)],
  //   ),
  //   new Recipe(
  //     'Lamb Tagine',
  //     'Lamb Tagine, rich flavours in the sauce.',
  //     'https://www.shemins.com/wp-content/uploads/2022/09/Lamb-and-Apricot-Tagine-537x537.jpg',
  //     [new Ingredient('Lamb', 500), new Ingredient('Apricots', 50)],
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

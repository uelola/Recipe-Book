import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Crispy Rice Paper Dumplings',
      'These rice crispy paper dumplings.',
      'https://onehappybite.com/wp-content/uploads/2024/04/DSC00595-2.jpg',
      [new Ingredient('Rice Paper', 10), new Ingredient('Ground Chicken', 200)],
    ),
    new Recipe(
      'Low Carb Chicken Stew',
      'Tasty keto meal prep for the week.',
      'https://www.shopflavcity.com/cdn/shop/articles/low-carb-chicken-stew-keto-cauliflower-rice-1.jpg?v=1759303140&width=720',
      [new Ingredient('Chicken', 300), new Ingredient('Cauliflower Rice', 100)],
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}

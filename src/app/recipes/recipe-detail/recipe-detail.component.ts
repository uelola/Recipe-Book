import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe | undefined;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  onAddToShoppingList() {
    // if (this.recipe) {
    //   this.recipe.ingredients.forEach((ingredient) => {
    //     // Add ingredient to shopping list
    //   });
    // }

    this.recipeService.addIngredientsToShoppingList(this.recipe!.ingredients);
  }
}

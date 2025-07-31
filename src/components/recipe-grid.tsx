"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { toggleFavorite, isFavorite } from "@/lib/favorites";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Clock, Users, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Ingredient {
  name: string;
  isAvailable?: boolean;
}

export interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredients: Ingredient[];
  missedIngredients: Ingredient[];
  diets?: string[];
  // ← NEW fields for prep time & servings:
  readyInMinutes: number;
  servings: number;
}

interface Props {
  searchState: {
    ingredients: string[];
    filters: Record<string, boolean>;
  };
  setLatestRecipes?: (recipes: Recipe[]) => void;
  featuredRecipe?: Recipe | null;
}

// Normalize & fuzzy-match helper
function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z]/g, "")
    .replace(/(es|s)$/, "");
}

function isIngredientMatch(inputList: string[], ingredientName: string) {
  const normalizedIngredient = normalize(ingredientName);
  return inputList.some((input) => {
    const normalizedInput = normalize(input);
    return (
      normalizedIngredient.includes(normalizedInput) ||
      normalizedInput.includes(normalizedIngredient)
    );
  });
}

export default function RecipeGrid({
  searchState,
  setLatestRecipes,
  featuredRecipe,
}: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { ingredients, filters } = searchState;
      if (!ingredients.length) return;
      setLoading(true);
      try {
        const diets = Object.entries(filters)
          .filter(([_, enabled]) => enabled)
          .map(([diet]) => diet);

        const body = { ingredients, diets };

        const res = await fetch("/api/recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data: Recipe[] = await res.json();
        setRecipes(data);
        setLatestRecipes?.(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchState, setLatestRecipes]);

  const renderCard = (recipe: Recipe, index: number) => (
    <motion.div
      key={recipe.id}
      className="relative"                /* ← make wrapper relative */
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* ← Favorite toggle button */}
      <button
        onClick={() => toggleFavorite(recipe)}
        className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white"
        aria-label={isFavorite(recipe.id) ? "Unfavorite" : "Favorite"}
      >
        <Heart
          className={`h-6 w-6 transition-colors ${
            isFavorite(recipe.id) ? "text-red-500 fill-current" : "text-gray-500"
          }`}
        />
      </button>
      <Card className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-52 w-full">
          <Image
            src={recipe.image.replace(/-\d+x\d+\.jpg$/, "-636x393.jpg")}
            alt={`Image of ${recipe.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h3 className="font-display text-2xl font-bold text-text-primary tracking-tight">
              {recipe.title}
            </h3>
            {/* ← Now shows actual time & servings */}
            <div className="mt-3 flex items-center space-x-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{recipe.readyInMinutes} mins</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-display text-base font-semibold text-text-primary">
                Key Ingredients
              </h4>
              <ul className="mt-3 space-y-2.5">
                {recipe.usedIngredients
                  .concat(recipe.missedIngredients)
                  .slice(0, 5)
                  .map((ingredient) => {
                    const isMatch = isIngredientMatch(
                      searchState.ingredients,
                      ingredient.name
                    );
                    return (
                      <li
                        key={ingredient.name}
                        className="flex items-center text-sm"
                      >
                        {isMatch ? (
                          <CheckCircle2 className="mr-2.5 h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="mr-2.5 h-5 w-5 text-destructive" />
                        )}
                        <span className="text-muted-foreground">
                          {ingredient.name}
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <CardFooter className="mt-6 p-0 pt-6">
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:brightness-110 focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2"
              asChild
            >
              <a
                href={`https://spoonacular.com/recipes/${recipe.title
                  .replace(/\s+/g, "-")
                  .toLowerCase()}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Recipe
              </a>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );

  const bestMatch =
    recipes.length > 0
      ? recipes.reduce((prev, curr) => {
          const prevMiss = prev.missedIngredients.length;
          const currMiss = curr.missedIngredients.length;
          const prevUsed = prev.usedIngredients.length;
          const currUsed = curr.usedIngredients.length;
          if (currMiss < prevMiss) return curr;
          if (currMiss === prevMiss && currUsed > prevUsed) return curr;
          return prev;
        }, recipes[0])
      : null;

  return (
    <section className="bg-background-secondary py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Recipes You Can Make
          </h2>
          <p className="mt-4 text-lg leading-8 text-text-secondary">
            {recipes.length > 0
              ? `Found ${recipes.length} recipes based on your ingredients.`
              : searchState.ingredients.length > 0
              ? "Searching for recipes based on your ingredients..."
              : "Add ingredients to find matching recipes."}
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-center text-text-muted">Loading recipes...</p>
        )}

        {/* Featured Recipe */}
        {featuredRecipe && (
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
              Surprise Pick
            </h3>
            {renderCard(featuredRecipe, 0)}
          </div>
        )}

        {/* Best Match */}
        {!featuredRecipe && bestMatch && recipes.length > 0 && (
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-text-primary mb-6 text-center">
              Best Match
            </h3>
            {renderCard(bestMatch, 0)}
          </div>
        )}

        {/* Remaining Recipes */}
        {recipes.length > 0 && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {recipes
              .filter((r) => r.id !== bestMatch?.id && r.id !== featuredRecipe?.id)
              .map((recipe, i) => renderCard(recipe, i + 1))}
          </div>
        )}

        {/* No Recipes Message */}
        {recipes.length === 0 && !loading && searchState.ingredients.length > 0 && (
          <div className="mt-16 text-center">
            <p className="text-lg text-text-secondary">
              No recipes found with your current ingredients or filters. Try adding more
              ingredients or changing your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.SPOONACULAR_KEY!;
if (!API_KEY) {
  console.error("❌ Missing SPOONACULAR_KEY in .env");
}

export async function POST(request: NextRequest) {
  try {
    const { ingredients, diets } = await request.json() as {
      ingredients: string[];
      diets?: string[];
    };

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: "Ingredients must be a non-empty array" },
        { status: 400 }
      );
    }

    let recipes: Array<{
      id: number;
      title: string;
      image: string;
      usedIngredients: any[];
      missedIngredients: any[];
      diets: string[];
      readyInMinutes: number;
      servings: number;
    }> = [];

    // CASE A: No diet filters → findByIngredients + details
    if (!Array.isArray(diets) || diets.length === 0) {
      const { data: matches } = await axios.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        {
          params: {
            ingredients: ingredients.join(","),
            number: 6,
            ranking: 1,
            ignorePantry: true,
            apiKey: API_KEY,
          },
        }
      );

      // Fetch full info for each match
      const detailed = await Promise.all(
        matches.map(async (m: any) => {
          const { data: info } = await axios.get(
            `https://api.spoonacular.com/recipes/${m.id}/information`,
            { params: { apiKey: API_KEY } }
          );
          return { match: m, info };
        })
      );

      recipes = detailed.map(({ match, info }) => ({
        id: match.id,
        title: match.title,
        image: match.image,
        usedIngredients: match.usedIngredients,
        missedIngredients: match.missedIngredients,
        diets: [],
        readyInMinutes: info.readyInMinutes,
        servings: info.servings,
      }));
    }
    // CASE B: Diet filters → complexSearch with addRecipeInformation
    else {
      const { data } = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            includeIngredients: ingredients.join(","),
            number: 6,
            addRecipeInformation: true,
            fillIngredients: true,
            diet: diets.join(","),
            apiKey: API_KEY,
          },
        }
      );

      const results = Array.isArray(data.results) ? data.results : [];

      recipes = results.map((r: any) => ({
        id: r.id,
        title: r.title,
        image: r.image,
        usedIngredients: r.usedIngredients || [],
        missedIngredients: r.missedIngredients || [],
        diets: r.diets || [],
        readyInMinutes: r.readyInMinutes ?? 0,
        servings: r.servings ?? 0,
      }));
    }

    return NextResponse.json(recipes);
  } catch (err: any) {
    console.error("💥 Spoonacular error:", err.response?.data || err.message);
    return NextResponse.json(
      {
        error: "Failed to fetch recipes",
        detail: err.response?.data?.message || err.message,
      },
      { status: 500 }
    );
  }
}

'use client';

import React, { useState, useCallback } from 'react';

import AppNavbar from '@/components/app-navbar';
import IngredientSelector, { type IngredientSelectorState } from '@/components/ingredient-selector';
import RecipeGrid from '@/components/recipe-grid';
import { CenteredWithLogo } from '@/components/blocks/footers/centered-with-logo';

// Mock user data for demonstration purposes
const MOCK_USER = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  imageUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // State for ingredient selection and dietary filters
  const [searchState, setSearchState] = useState<IngredientSelectorState>({
    ingredients: ['Tomatoes', 'Onion', 'Garlic'],
    filters: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      keto: false,
    },
  });

  // Handle changes from the IngredientSelector component
  const handleStateChange = useCallback((newState: IngredientSelectorState) => {
    console.log('Search state updated:', newState);
    setSearchState(newState);
  }, []);

  const handleSignIn = () => {
    console.log('Signing in...');
    setIsAuthenticated(true);
  };
  
  const handleSignOut = () => {
    console.log('Signing out...');
    setIsAuthenticated(false);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppNavbar 
      />
      <main className="flex-grow pt-16">
        {/*
          This section combines the visual style of the hero (background gradients, typography)
          with the functional IngredientSelector component, creating a single, cohesive interactive header.
        */}
        <div className="relative isolate bg-background-secondary px-6 pt-14 lg:px-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-40">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-text-primary sm:text-7xl">
                Find Perfect Recipes with Your Ingredients
              </h1>
              <p className="mt-8 text-lg text-pretty text-text-secondary sm:text-xl/8">
                Discover delicious recipes that match what's already in your kitchen. Simply add your ingredients and
                we'll find the perfect meals for you.
              </p>
            </div>
            <div className="mt-12">
              <IngredientSelector
                onStateChange={handleStateChange}
                initialState={searchState}
              />
            </div>
          </div>
          
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
        
        {/* Recipe Grid Section */}
        <RecipeGrid searchState={searchState} />
      </main>

      <CenteredWithLogo />
    </div>
  );
}

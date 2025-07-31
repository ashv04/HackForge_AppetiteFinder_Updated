"use client";

import * as React from "react";
import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// Mock data for autocomplete suggestions - in a real app, this would come from an API
const ALL_INGREDIENTS: string[] = [
  "Chicken", "Beef", "Pork", "Tofu", "Salmon", "Shrimp",
  "Tomatoes", "Onions", "Garlic", "Bell Peppers", "Broccoli", "Spinach", "Lettuce", "Cucumber",
  "Rice", "Pasta", "Quinoa", "Bread", "Potatoes", "Flour", "Lentils", "Black Beans",
  "Olive Oil", "Butter", "Cheese", "Milk", "Eggs", "Yogurt",
  "Salt", "Black Pepper", "Paprika", "Cumin", "Coriander", "Turmeric", "Basil", "Oregano",

  "Soy Sauce", "Lemon Juice", "Vinegar", "Honey", "Maple Syrup"
];

const DIETARY_FILTERS = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "glutenFree", label: "Gluten-Free" },
  { id: "dairyFree", label: "Dairy-Free" },
  { id: "keto", label: "Keto" },
];

export interface IngredientSelectorState {
  ingredients: string[];
  filters: Record<string, boolean>;
}

interface IngredientSelectorProps {
  initialState?: Partial<IngredientSelectorState>;
  onStateChange?: (newState: IngredientSelectorState) => void;
}

export default function IngredientSelector({ initialState, onStateChange }: IngredientSelectorProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(initialState?.ingredients ?? ["Tomatoes", "Onion", "Garlic"]);
  const [inputValue, setInputValue] = useState("");
  const [filters, setFilters] = useState<Record<string, boolean>>(
    initialState?.filters ?? {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      keto: false,
    }
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mergedState: IngredientSelectorState = useMemo(() => ({
    ingredients: selectedIngredients,
    filters,
  }), [selectedIngredients, filters]);

  React.useEffect(() => {
    onStateChange?.(mergedState);
  }, [mergedState, onStateChange]);

  const suggestions = useMemo(() => {
    const trimmedInput = inputValue.trim().toLowerCase();
    if (!trimmedInput) return [];
    return ALL_INGREDIENTS.filter(
      (ingredient) =>
        ingredient.toLowerCase().includes(trimmedInput) &&
        !selectedIngredients.some(sel => sel.toLowerCase() === ingredient.toLowerCase())
    ).slice(0, 5);
  }, [inputValue, selectedIngredients]);

  const handleAddIngredient = useCallback((ingredient: string) => {
    const trimmedIngredient = ingredient.trim();
    if (trimmedIngredient && !selectedIngredients.some(sel => sel.toLowerCase() === trimmedIngredient.toLowerCase())) {
      setSelectedIngredients((prev) => [...prev, trimmedIngredient]);
    }
    setInputValue("");
    inputRef.current?.focus();
  }, [selectedIngredients]);

  const handleRemoveIngredient = useCallback((ingredientToRemove: string) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ingredientToRemove));
  }, []);

  const handleFilterToggle = useCallback((filterId: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterId]: !prevFilters[filterId],
    }));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      handleAddIngredient(suggestions[0]);
    } else if (e.key === 'Backspace' && inputValue === '' && selectedIngredients.length > 0) {
      e.preventDefault();
      handleRemoveIngredient(selectedIngredients[selectedIngredients.length - 1]);
    }
  };

  return (
    <div className="bg-background-secondary p-6 sm:p-8 rounded-xl w-full max-w-3xl mx-auto font-sans shadow-sm border border-border">
      <div className="space-y-8">
        {/* Ingredients Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary tracking-tight">Your Ingredients</h2>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search to add ingredients..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setTimeout(() => setIsInputFocused(false), 200)} // Delay allows for click on suggestions
              onKeyDown={handleKeyDown}
              className="pl-11 pr-4 py-2 h-12 text-base bg-background rounded-md border-border focus-visible:ring-primary"
              aria-label="Add ingredient"
            />
            <AnimatePresence>
              {isInputFocused && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 5 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute z-20 w-full mt-1 bg-card border border-border rounded-md shadow-lg"
                >
                  <ul className="py-1">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleAddIngredient(suggestion);
                        }}
                        className="px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer transition-colors duration-150"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 min-h-[44px]">
            <AnimatePresence>
              {selectedIngredients.map((ingredient) => (
                <motion.div
                  key={ingredient}
                  layout
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Badge
                    variant="secondary"
                    className="h-auto flex items-center gap-x-1.5 py-1.5 pl-3.5 pr-1.5 rounded-full bg-muted text-foreground font-medium text-sm border-border/80 cursor-default"
                  >
                    <span>{ingredient}</span>
                    <button
                      onClick={() => handleRemoveIngredient(ingredient)}
                      className="group flex-shrink-0 rounded-full bg-transparent hover:bg-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-muted"
                      aria-label={`Remove ${ingredient}`}
                    >
                      <X className="h-4 w-4 text-primary group-hover:text-primary-foreground p-0.5 transition-colors duration-200" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Dietary Preferences Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-xl font-semibold text-text-primary tracking-tight">Dietary Preferences</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-x-6 gap-y-4">
            {DIETARY_FILTERS.map((filter) => (
              <div key={filter.id} className="flex items-center space-x-2.5">
                <Switch
                  id={filter.id}
                  checked={filters[filter.id]}
                  onCheckedChange={() => handleFilterToggle(filter.id)}
                  aria-labelledby={`${filter.id}-label`}
                />
                <Label
                  htmlFor={filter.id}
                  id={`${filter.id}-label`}
                  className="text-sm font-medium text-text-secondary cursor-pointer"
                >
                  {filter.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
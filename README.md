# Appetite Finder

A Next.js application that helps you find recipes based on ingredients you already have in your kitchen. This project uses the Spoonacular API to search for recipes and filter them by dietary preferences.

## Features

- Search for recipes by ingredients
- Filter recipes by dietary preferences (vegetarian, vegan, gluten-free, etc.)
- View recipe details including used and missing ingredients
- Get a "best match" recipe based on your ingredients
- "Surprise me" feature to randomly select a recipe

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Spoonacular API key (get one at [https://spoonacular.com/food-api](https://spoonacular.com/food-api))

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd appetite-finder
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Spoonacular API key:

```
SPOONACULAR_KEY=your_api_key_here
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. Enter the ingredients you have in your kitchen
2. Select any dietary preferences (optional)
3. The app will search for recipes that match your ingredients and preferences
4. View the "Best Match" recipe at the top
5. Browse all matching recipes below
6. Click "View Recipe" to see the full recipe details on Spoonacular

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Spoonacular API

## License

This project is licensed under the MIT License - see the LICENSE file for details.
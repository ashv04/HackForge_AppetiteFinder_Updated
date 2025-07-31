export interface QuizQuestion {
  question: string;
  choices: string[];
  answer: number;
}

const questions: QuizQuestion[] = [
  {
    question: "What percentage of global food produced is wasted each year?",
    choices: ["10%", "25%", "33%", "50%"],
    answer: 2,
  },
  {
    question: "Which gas is most associated with food waste in landfills?",
    choices: ["Carbon Dioxide", "Methane", "Nitrous Oxide", "Ozone"],
    answer: 1,
  },
  {
    question: "Leftover fruits and vegetables can be composted to reduce waste.",
    choices: ["True", "False"],
    answer: 0,
  },
  {
    question: "Estimate the amount of water (in liters) wasted per kilogram of beef produced.",
    choices: ["500L", "1500L", "5000L", "10000L"],
    answer: 3,
  },
  {
    question: "Which practice helps reduce food waste at home?",
    choices: [
      "Meal planning",
      "Overbuying in bulk",
      "Ignoring expiration dates",
      "Cooking extra portions",
    ],
    answer: 0,
  },
  {
    question: "What does the 'use by' date on a package typically mean?",
    choices: [
      "Recommended last date for best flavor",
      "Safety date after which food shouldn’t be eaten",
      "Date to mark for composting",
      "Sell-by date for retailers",
    ],
    answer: 1,
  },
  {
    question: "Which method diverts unwanted food waste from landfills?",
    choices: [
      "Anaerobic digestion",
      "Composting",
      "Incineration",
      "Ocean dumping",
    ],
    answer: 1,
  },
  {
    question: "Meal planning helps reduce food waste by:",
    choices: [
      "Encouraging cooking experiments",
      "Buying in bulk only",
      "Purchasing only what you need",
      "Extending shelf life",
    ],
    answer: 2,
  },
  {
    question:
      "In the U.S., approximately how much edible food is thrown away annually by households?",
    choices: [
      "5 million tons",
      "10 million tons",
      "20 million tons",
      "40 million tons",
    ],
    answer: 3,
  },
  {
    question: "Which material is NOT recommended for home composting?",
    choices: [
      "Eggshells",
      "Coffee grounds",
      "Plastic wrappers",
      "Vegetable scraps",
    ],
    answer: 2,
  },
  {
    question:
      "What percentage of methane emissions in the U.S. comes from landfills?",
    choices: ["5%", "15%", "20%", "30%"],
    answer: 1,
  },
  {
    question: "True or False: Freezing leftovers extends the safe consumption period.",
    choices: ["True", "False"],
    answer: 0,
  },
  {
    question: "Which action contributes most to reducing food waste at home?",
    choices: [
      "Composting scraps",
      "Eating leftovers",
      "Buying discounted clearance items",
      "Recycling packaging",
    ],
    answer: 1,
  },
  {
    question: "Which technology helps retailers reduce food waste?",
    choices: [
      "RFID inventory tracking",
      "Solar panels",
      "Augmented reality shopping",
      "3D printing",
    ],
    answer: 0,
  },
  {
    question: "Which smartphone feature can help reduce food waste?",
    choices: [
      "Barcode scanning for expiry dates",
      "Social media sharing",
      "Video streaming",
      "Voice calls",
    ],
    answer: 0,
  },
  // Add these to your questions array in src/lib/quiz-bank.ts
  {
    question: "Approximately what percentage of food waste in developed countries comes from households?",
    choices: ["10%", "30%", "50%", "70%"],
    answer: 2 // 50%
  },
  {
    question: "True or False: Composting food scraps can reduce methane emissions compared to landfilling.",
    choices: ["True", "False"],
    answer: 0
  },
  {
    question: "Which fruit typically has the shortest shelf life at room temperature?",
    choices: ["Apple", "Banana", "Strawberry", "Orange"],
    answer: 2
  },
  {
    question: "What is the recommended freezer temperature (in °C) to safely store food long-term?",
    choices: ["0°C", "-5°C", "-10°C", "-18°C"],
    answer: 3
  },
  {
    question: "Which stage of the food supply chain contributes the most greenhouse gas emissions?",
    choices: ["Production", "Transportation", "Storage", "Disposal"],
    answer: 0
  },
  {
    question: "Per metric ton of food, approximately how much CO₂-equivalent is saved by composting vs. landfilling?",
    choices: ["500 kg", "1 ton", "1.5 tons", "2 tons"],
    answer: 1
  },
  {
    question: "Which label indicates the last date a perishable food should be eaten for safety?",
    choices: ["Best By", "Use By", "Sell By", "Enjoy By"],
    answer: 1
  },
  {
    question: "True or False: Canning generally extends shelf life more than freezing.",
    choices: ["True", "False"],
    answer: 0
  },
  {
    question: "What is the ideal carbon-to-nitrogen ratio (browns:greens) for home composting?",
    choices: ["10:1", "20:1", "30:1", "40:1"],
    answer: 2
  },
  {
    question: "Which retail practice often leads directly to increased food waste?",
    choices: ["Understocking", "Overstocking", "Precision pricing", "Demand forecasting"],
    answer: 1
  },

  ];

export function getRandomQuiz(count = 3): QuizQuestion[] {
  return [...questions].sort(() => 0.5 - Math.random()).slice(0, count);
}

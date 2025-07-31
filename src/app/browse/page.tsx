"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Utensils, Target, Users, Heart, Clock } from "lucide-react";
import AppNavbar from "@/components/app-navbar";
import { motion } from "framer-motion";

const resources = [
  {
    id: 1,
    icon: BookOpen,
    title: "Beginner's Guide to Nutrition",
    description: "Learn the fundamentals of healthy eating and meal planning with our comprehensive starter guide.",
    link: "https://www.healthline.com/nutrition/how-to-eat-healthy-guide",
  },
  {
    id: 2,
    icon: Utensils,
    title: "Meal Planning Made Simple",
    description: "Discover time-saving strategies and practical tips for organizing your weekly meals efficiently.",
    link: "https://myplate-prod.azureedge.us/sites/default/files/2024-06/TipSheet-24-Meal-Planning.pdf",
  },
  {
    id: 3,
    icon: Target,
    title: "Setting Realistic Health Goals",
    description: "Create achievable wellness objectives and track your progress with proven goal-setting techniques.",
    link: "https://diabetes.org/health-wellness/weight-management/12-easy-health-goals",
  },
  {
    id: 4,
    icon: Users,
    title: "Family Nutrition Strategies",
    description: "Tips and tricks for feeding the whole family healthy, delicious meals everyone will enjoy.",
    link: "https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/nutrition-basics/daily-tips-to-help-your-family-eat-better",
  },
  {
    id: 5,
    icon: Heart,
    title: "Heart-Healthy Recipes",
    description: "A collection of delicious recipes designed to support cardiovascular health and overall wellness.",
    link: "https://recipes.heart.org/en/",
  },
  {
    id: 6,
    icon: Clock,
    title: "Quick & Easy Meal Ideas",
    description: "Fast, nutritious meal solutions perfect for busy schedules without compromising on quality.",
    link: "https://www.themediterraneandish.com/easy-healthy-dinner-ideas/",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppNavbar />

      <div className="relative isolate px-6 pt-16 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
          />
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of helpful guides, tips, and tools to support your journey toward better health and nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {resources.map(({ id, icon: Icon, title, description, link }) => (
              <Card
                key={id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border bg-card"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground mb-6 leading-relaxed">
                    {description}
                  </CardDescription>
                  <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="block"
                  >
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-300 group-hover:shadow-md">
                      Learn More
                    </Button>
                  </motion.a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">
              Want a deeper dive into nutrition?
            </p>
            <Button
              asChild
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              variant="outline"
            >
              <a
                href="https://www.healthline.com/nutrition/how-to-eat-healthy-guide"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore More on Healthline
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
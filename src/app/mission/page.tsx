"use client";

import React from "react";
import { Leaf, Droplet, Zap } from "lucide-react";
import AppNavbar from "@/components/app-navbar";
import { motion } from "framer-motion";

const impactPoints = [
  {
    icon: Leaf,
    title: "Climate Impact",
    description: "Food waste generates methane, a potent greenhouse gas.",
  },
  {
    icon: Droplet,
    title: "Water Pollution",
    description:
      "Decomposing food in landfills can leak harmful runoff into water supplies.",
  },
  {
    icon: Zap,
    title: "Resource Waste",
    description: "Producing uneaten food wastes land, water, and energy.",
  },
];

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppNavbar />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            Our Mission
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            At Appetite Finder, we believe no ingredient should go to waste. Our
            goal is to help you discover delicious recipes using what’s already
            in your kitchen-cutting down on food waste and saving money.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impactPoints.map(({ icon: Icon, title, description }, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group p-6 rounded-xl bg-card border border-border shadow-md transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="mb-4 inline-flex items-center justify-center p-3 rounded-full bg-accent text-accent-foreground group-hover:shadow-lg"
              >
                <Icon className="h-6 w-6" />
              </motion.div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}

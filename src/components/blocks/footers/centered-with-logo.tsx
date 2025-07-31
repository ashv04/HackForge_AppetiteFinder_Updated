"use client";

import { cn } from "@/lib/utils";
import {
  Github,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export function CenteredWithLogo() {
  const pages = [
    {
      title: "Resources",
      href: "/browse",
    },
    {
      title: "Quiz",
      href: "/kitchen",
    },
    {
      title: "Mission",
      href: "/mission",
    },
  ];

  return (
    <div className="border-t border-border px-8 py-20 bg-background-secondary w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-sm text-muted-foreground justify-between items-start md:px-8">
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="mr-0 md:mr-4 md:flex mb-4">
            <Logo />
          </div>
          <p className="max-w-md text-center text-muted-foreground mb-8">
            Discover recipes that match your ingredients and dietary
            preferences.
          </p>

          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-muted-foreground list-none">
            {pages.map((page, idx) => (
              <li key={"pages" + idx} className="list-none">
                <Link
                  className="transition-colors hover:text-accent"
                  href={page.href}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>

          <GridLineHorizontal className="max-w-7xl mx-auto mt-8" />
        </div>
        <div className="flex sm:flex-row flex-col justify-between mt-8 items-center w-full">
          <p className="text-muted-foreground mb-8 sm:mb-0">
            &copy; {new Date().getFullYear()} Appetite Finder
          </p>
          <div className="flex gap-4">
            <Link href="https://github.com/fatord" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 text-muted-foreground hover:text-accent transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "w-[calc(100%+var(--offset))] h-[var(--height)]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        className
      )}
    ></div>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-foreground px-2 py-1 relative z-20"
    >
      <UtensilsCrossed className="h-7 w-7 text-accent" />
      <span className="font-semibold text-lg text-foreground">
        Appetite Finder
      </span>
    </Link>
  );
};

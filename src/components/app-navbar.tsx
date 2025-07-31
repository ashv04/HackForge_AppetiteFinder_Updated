"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { subscribe } from "@/lib/favorites";
import { motion } from "framer-motion";
import { ChefHat, Menu, Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType | null;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: ChefHat },
  { href: "/browse", label: "Resources", icon: null },
  { href: "/kitchen", label: "Quiz", icon: null },
];

export interface AppNavbarProps {}

const AppNavbar: React.FC<AppNavbarProps> = () => {
  const pathname = usePathname();
  const [favCount, setFavCount] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribe(setFavCount);
    return unsubscribe;
  }, []);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const Logo = () => (
    <Link
      href="/"
      className="flex items-center gap-2 focus:outline-none rounded-md px-1 py-1"
      style={{ minHeight: 40 }}
      onClick={() => setIsSheetOpen(false)}
    >
      <span className="flex items-center justify-center bg-primary/10 rounded-full p-1.5">
        <ChefHat className="h-6 w-6 text-primary" />
      </span>
      <span className="text-xl font-semibold tracking-tight font-display text-text-primary leading-none">
        Appetite Finder
      </span>
    </Link>
  );

  const NavLink = ({
    href,
    label,
    isMobile = false,
  }: {
    href: string;
    label: string;
    isMobile?: boolean;
  }) => {
    const isActive = pathname === href;
    const linkContent = (
      <Link
        href={href}
        className={cn(
          "relative text-[15px] font-semibold transition-colors duration-200 focus:outline-none rounded-md px-2 py-1",
          isActive
            ? "text-primary"
            : "text-text-secondary hover:text-primary",
          isMobile &&
            "text-lg flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary/50"
        )}
        aria-current={isActive ? "page" : undefined}
        onClick={() => isMobile && setIsSheetOpen(false)}
      >
        {label}
        {isActive && !isMobile && (
          <motion.div
            className="absolute -bottom-1 left-2 right-2 h-0.5 rounded bg-primary"
            layoutId="underline"
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
          />
        )}
      </Link>
    );

    return isMobile ? <SheetClose asChild>{linkContent}</SheetClose> : <div>{linkContent}</div>;
  };

  const SavedRecipes = ({ count = favCount, isMobile = false }) => (
    <Link
      href="/favorites"
      className={cn(
        "relative flex items-center justify-center group text-text-secondary hover:text-primary focus:outline-none",
        isMobile && "text-lg px-4 py-3 gap-3"
      )}
      aria-label="Saved Recipes"
      onClick={() => isMobile && setIsSheetOpen(false)}
    >
      <Heart
        className={cn("w-6 h-6", count > 0 ? "fill-primary/40" : "")}
      />
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 bg-primary text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md select-none pointer-events-none">
          {count}
        </span>
      )}
      {isMobile && <span className="ml-2">Saved Recipes</span>}
    </Link>
  );

  const MissionLink = ({ isMobile = false }: { isMobile?: boolean }) => {
    const isActive = pathname === "/mission";
    return (
      <Link
        href="/mission"
        className={cn(
          "text-[15px] font-semibold transition-colors duration-200 px-2 py-1",
          isActive ? "text-primary" : "text-text-secondary hover:text-primary",
          isMobile && "text-lg px-4 py-3 rounded-lg hover:bg-secondary/50"
        )}
        aria-current={isActive ? "page" : undefined}
        onClick={() => isMobile && setIsSheetOpen(false)}
      >
        Mission
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-sm border-b border-border shadow-[0_2px_8px_0_rgba(40,50,80,0.03)]">
      <nav className="container flex h-12 items-center justify-between gap-4 mx-auto px-3 lg:px-6">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 flex-1 ml-5">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <SavedRecipes count={2} />
          <MissionLink />
        </div>

        {/* Mobile Hamburger and Sheet */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full max-w-sm bg-background px-0 pb-0 pt-0"
            >
              <SheetHeader className="px-6 py-4 border-b border-border">
                <Logo />
              </SheetHeader>
              <div className="px-2 py-5 flex flex-col min-h-[calc(100vh-80px)] justify-between gap-2">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      isMobile
                    />
                  ))}
                  <SavedRecipes count={favCount} isMobile />
                  <MissionLink isMobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default AppNavbar;

"use client"

import { memo, useCallback } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Dictionary } from '@/lib/dictionaries'

interface DarkModeToggleButtonProps {
  dict: Dictionary['common']
}

export const DarkModeToggleButton = memo(({ dict }: DarkModeToggleButtonProps) => {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
  }, [setTheme]);

  const getCurrentThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />;
      case 'dark':
        return <Moon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />;
      default:
        return <Monitor className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          aria-label="Toggle theme"
          className="relative overflow-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem 
          onClick={() => handleThemeChange("light")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sun className="h-4 w-4" aria-hidden="true" />
          <span>{dict.lightMode}</span>
          {theme === 'light' && (
            <div className="ml-auto h-2 w-2 bg-current rounded-full" aria-hidden="true" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("dark")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Moon className="h-4 w-4" aria-hidden="true" />
          <span>{dict.darkMode}</span>
          {theme === 'dark' && (
            <div className="ml-auto h-2 w-2 bg-current rounded-full" aria-hidden="true" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleThemeChange("system")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Monitor className="h-4 w-4" aria-hidden="true" />
          <span>System</span>
          {(!theme || theme === 'system') && (
            <div className="ml-auto h-2 w-2 bg-current rounded-full" aria-hidden="true" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
});

DarkModeToggleButton.displayName = 'DarkModeToggleButton';

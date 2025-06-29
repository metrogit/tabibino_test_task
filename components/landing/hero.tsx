"use client";

import { useTransition, useState, useEffect, memo } from "react";
import { 
  Clock, 
  Shield, 
  Stethoscope,
  Heart,
  Phone,
  MapPin
} from "lucide-react";
import { Dictionary } from "@/lib/dictionaries";
import HeroContent from "./hero-content";

interface HeroProps {
  dictionary: Dictionary;
}



const Hero = memo(({ dictionary }: HeroProps) => {
  const [isPending, startTransition] = useTransition();
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    startTransition(() => {
      setIsVisible(true);
    });

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const featureCards = [
    {
      icon: <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" aria-hidden="true" />,
      tooltip: dictionary.hero.features.quickBooking,
      position: "top-32 left-12"
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform" aria-hidden="true" />,
      tooltip: dictionary.hero.features.expertDoctors,
      position: "top-32 right-12"
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" aria-hidden="true" />,
      tooltip: dictionary.hero.features.securePrivate,
      position: "top-1/2 left-8 transform -translate-y-1/2"
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform" aria-hidden="true" />,
      tooltip: dictionary.hero.features.trustedCare,
      position: "top-1/2 right-8 transform -translate-y-1/2"
    },
    {
      icon: <Phone className="h-6 w-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" aria-hidden="true" />,
      tooltip: dictionary.hero.features.support,
      position: "bottom-32 left-16"
    },
    {
      icon: <MapPin className="h-6 w-6 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform" aria-hidden="true" />,
      tooltip: dictionary.hero.features.findNearby,
      position: "bottom-32 right-16"
    }
  ];

  const trustIndicators = [
    {
      color: "bg-green-500",
      text: dictionary.hero.trustIndicators.support
    },
    {
      color: "bg-blue-500", 
      text: dictionary.hero.trustIndicators.security
    },
    {
      color: "bg-purple-500",
      text: dictionary.hero.trustIndicators.booking
    }
  ];

  return (
    // I made it SSR component since the contents should SEO friendly
    <HeroContent
      dictionary={dictionary}
      prefersReducedMotion={prefersReducedMotion}
      isVisible={isVisible}
      isPending={isPending}
      trustIndicators={trustIndicators}
      featureCards={featureCards}
    />
  );
});

Hero.displayName = 'Hero';

export default Hero;

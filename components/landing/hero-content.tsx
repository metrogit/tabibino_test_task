import Link from "next/link";
import { Button } from "../ui/button";
import { 
  Calendar, 
  ArrowRight, 
} from "lucide-react";
import { Dictionary } from "@/lib/dictionaries";

interface TrustIndicator {
  color: string;
  text: string;
}

interface FeatureCard {
  icon: React.ReactNode;
  tooltip: string;
  position: string;
}

interface HeroContentProps {
  dictionary: Dictionary;
  prefersReducedMotion: boolean;
  isVisible: boolean;
  isPending: boolean;
  trustIndicators: TrustIndicator[];
  featureCards: FeatureCard[];
}

const FeatureCard = ({ 
  icon, 
  tooltip, 
  position,
  isVisible 
}: { 
  icon: React.ReactNode; 
  tooltip: string;
  position: string;
  isVisible: boolean;
}) => (
  <div 
    className={`absolute ${position} bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}
    role="complementary"
    aria-label={tooltip}
  >
    {icon}
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      {tooltip}
    </div>
  </div>
);

export default function HeroContent({
  dictionary,
  prefersReducedMotion,
  isVisible,
  isPending,
  trustIndicators,
  featureCards
}: HeroContentProps) {
  return (
    <section 
      className="py-8 min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 pt-20 relative overflow-hidden"
      aria-labelledby="hero-title"
      role="main"
    >
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`max-w-4xl mx-auto ${!prefersReducedMotion ? 'transition-all duration-1000 ease-out' : ''} ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${isPending ? 'pointer-events-none' : ''}`}>
          
          <div className={`inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-100 dark:border-blue-900/30 ${!prefersReducedMotion ? 'transition-all duration-1000 delay-200 ease-out' : ''} ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className={`w-2 h-2 bg-blue-500 rounded-full ${!prefersReducedMotion ? 'animate-pulse' : ''}`} aria-hidden="true"></div>
            {dictionary.hero.badge}
          </div>

          <h1 
            id="hero-title"
            className={`text-5xl md:text-7xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight ${!prefersReducedMotion ? 'transition-all duration-1000 delay-300 ease-out' : ''} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {dictionary.hero.title.part1}
            <br />
            <span className="font-extrabold text-blue-600 dark:text-blue-400">
              {dictionary.hero.title.part2}
            </span>
          </h1>

          <p className={`text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed ${!prefersReducedMotion ? 'transition-all duration-1000 delay-500 ease-out' : ''} ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {dictionary.hero.description}
          </p>

          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 ${!prefersReducedMotion ? 'transition-all duration-1000 delay-700 ease-out' : ''} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            role="group"
            aria-label="Main actions"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {dictionary.hero.buttons.myAppointments}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-base rounded-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Link href="/schedule" className="flex items-center gap-2">
                {dictionary.hero.buttons.viewSchedule}
              </Link>
            </Button>
          </div>

          <div 
            className={`flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400 ${!prefersReducedMotion ? 'transition-all duration-1000 delay-900 ease-out' : ''} ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            role="list"
            aria-label="Trust indicators"
          >
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2" role="listitem">
                <div className={`w-2 h-2 ${indicator.color} rounded-full`} aria-hidden="true"></div>
                <span>{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`hidden lg:block ${!prefersReducedMotion ? 'transition-all duration-1500 delay-1000 ease-out' : ''} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              tooltip={card.tooltip}
              position={card.position}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-1/4 left-10 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl opacity-60" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full blur-2xl opacity-60" aria-hidden="true"></div>
    </section>
  );
} 
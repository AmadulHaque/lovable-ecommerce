import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero = ({ onShopNow }: HeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary-glow/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Premium Electronics
            </h1>
            <h2 className="text-xl lg:text-2xl text-muted-foreground">
              Discover cutting-edge technology at unbeatable prices
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            From wireless headphones to smart devices, find everything you need to upgrade your tech lifestyle. 
            Free shipping on orders over $50.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              onClick={onShopNow}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity px-8 py-6 text-lg"
            >
              Shop Now
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
            <div className="text-sm text-muted-foreground">
              ⚡ Free shipping • 30-day returns • 1-year warranty
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
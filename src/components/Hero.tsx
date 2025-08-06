import { Button } from '@/components/ui/button';
import { ArrowDown, Shield, Truck, RotateCcw, Users, Star, Award } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero = ({ onShopNow }: HeroProps) => {
  const features = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
    { icon: Shield, title: "1-Year Warranty", desc: "Full protection" },
    { icon: RotateCcw, title: "30-Day Returns", desc: "No questions asked" },
    { icon: Award, title: "Premium Quality", desc: "Certified products" }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "99.9%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Customer Support" },
    { number: "1M+", label: "Products Sold" }
  ];

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary-glow/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        {/* Main Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
              <Users className="w-4 h-4" />
              <span>Trusted by 50,000+ customers worldwide</span>
              <div className="flex ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Premium Electronics Store
            </h1>
            <h2 className="text-xl lg:text-2xl text-muted-foreground">
              Discover cutting-edge technology at unbeatable prices
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            From wireless headphones to smart devices, find everything you need to upgrade your tech lifestyle. 
            Quality guaranteed with our premium selection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              onClick={onShopNow}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity px-8 py-6 text-lg shadow-elegant"
            >
              Shop Now
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/5"
            >
              View Catalog
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 animate-fade-in">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {features.map((feature, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm rounded-lg p-6 text-center border border-border/50 hover:border-primary/20 transition-colors">
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-sm mb-2">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
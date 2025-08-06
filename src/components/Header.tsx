import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Store } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartOpen: () => void;
}

export const Header = ({ cartItemsCount, onCartOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">TechStore</h1>
            <p className="text-xs text-muted-foreground">Premium Electronics</p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={onCartOpen}
          className="relative hover:bg-primary/5"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart
          {cartItemsCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};
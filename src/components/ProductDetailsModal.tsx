import { Product, ProductReview } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Zap, MessageSquare, User, Calendar } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onWriteReview: (product: Product) => void;
}

export const ProductDetailsModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onBuyNow,
  onWriteReview
}: ProductDetailsModalProps) => {
  if (!product) return null;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-accent text-accent' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              {product.badge && (
                <Badge 
                  variant={product.badge === 'Sale' ? 'destructive' : 'default'}
                  className="text-xs font-medium"
                >
                  {product.badge}
                </Badge>
              )}
              {hasDiscount && (
                <Badge variant="secondary" className="text-xs font-medium bg-accent text-accent-foreground">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
                <span className="font-medium ml-1">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              {hasDiscount && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => onBuyNow(product)}
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                size="lg"
              >
                <Zap className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => onAddToCart(product)}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={() => onWriteReview(product)}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Write Review
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        {product.userReviews && product.userReviews.length > 0 && (
          <>
            <Separator className="my-6" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {product.userReviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{review.reviewerName}</span>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
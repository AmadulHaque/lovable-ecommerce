import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

interface ProductReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSubmitReview: (reviewData: {
    productId: string;
    rating: number;
    comment: string;
    reviewerName: string;
  }) => void;
}

export const ProductReviewModal = ({
  isOpen,
  onClose,
  product,
  onSubmitReview,
}: ProductReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !comment.trim() || !reviewerName.trim()) {
      toast({
        title: "Please fill all fields",
        description: "Rating, name, and review comment are required.",
        variant: "destructive",
      });
      return;
    }

    if (!product) return;

    onSubmitReview({
      productId: product.id,
      rating,
      comment: comment.trim(),
      reviewerName: reviewerName.trim(),
    });

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Your review has been submitted.",
    });

    // Reset form
    setRating(0);
    setComment('');
    setReviewerName('');
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setComment('');
    setReviewerName('');
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-medium text-sm">{product.name}</h3>
              <p className="text-sm text-muted-foreground">${product.price}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rating */}
            <div className="space-y-2">
              <Label>Rating *</Label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating > 0 && `${rating}/5 stars`}
                </span>
              </div>
            </div>

            {/* Reviewer Name */}
            <div className="space-y-2">
              <Label htmlFor="reviewerName">Your Name *</Label>
              <Input
                id="reviewerName"
                placeholder="Enter your name"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Review Comment */}
            <div className="space-y-2">
              <Label htmlFor="comment">Your Review *</Label>
              <Textarea
                id="comment"
                placeholder="Share your experience with this product..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {comment.length}/500 characters
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-primary-glow"
              >
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  review: string;
  product: string;
  date: string;
  verified: boolean;
}

const customerReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    review: 'Amazing sound quality! The noise cancellation is incredible and the battery life exceeds expectations. Perfect for daily commuting.',
    product: 'Wireless Headphones Pro',
    date: '2024-01-15',
    verified: true
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    review: 'Fast shipping and excellent packaging. The smartphone works flawlessly and the camera quality is outstanding for the price point.',
    product: 'Smartphone X1',
    date: '2024-01-12',
    verified: true
  },
  {
    id: '3',
    name: 'Emily Davis',
    avatar: '/api/placeholder/40/40',
    rating: 4,
    review: 'Great laptop for programming and design work. The display is crystal clear and performance is smooth. Highly recommend!',
    product: 'Gaming Laptop',
    date: '2024-01-10',
    verified: true
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    review: 'The smartwatch exceeded my expectations. Great fitness tracking features and the interface is very intuitive to use.',
    product: 'Smart Watch',
    date: '2024-01-08',
    verified: true
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    avatar: '/api/placeholder/40/40',
    rating: 5,
    review: 'Excellent customer service and product quality. The wireless speaker delivers amazing sound for such a compact size.',
    product: 'Portable Speaker',
    date: '2024-01-05',
    verified: true
  }
];

export const ReviewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(customerReviews.length / reviewsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentReviews = () => {
    const start = currentIndex * reviewsPerPage;
    return customerReviews.slice(start, start + reviewsPerPage);
  };

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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getCurrentReviews().map((review) => (
              <Card key={review.id} className="bg-card hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{review.name}</h4>
                        {review.verified && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {review.product} • {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="w-6 h-6 text-primary/20 absolute -top-2 -left-1" />
                    <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                      {review.review}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex === totalPages - 1}
              className="w-10 h-10 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
  userReviews?: ProductReview[];
}

export interface ProductReview {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  reviewerName: string;
  date: string;
  verified?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}
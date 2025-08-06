import { useState, useRef } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ReviewsSlider } from '@/components/ReviewsSlider';
import { ProductCard } from '@/components/ProductCard';
import { CartSidebar } from '@/components/CartSidebar';
import { CheckoutModal } from '@/components/CheckoutModal';
import { ProductDetailsModal } from '@/components/ProductDetailsModal';
import { ProductReviewModal } from '@/components/ProductReviewModal';
import { useToast } from '@/hooks/use-toast';
import { Product, ProductReview } from '@/types/product';

const Index = () => {
  const {
    cart,
    isOpen: isCartOpen,
    setIsOpen: setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [productReviews, setProductReviews] = useState<ProductReview[]>([]);
  const productsRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleShopNow = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    setIsProductDetailsOpen(false);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart and checkout opened.`,
    });
  };

  const handleWriteReview = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(false);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (reviewData: {
    productId: string;
    rating: number;
    comment: string;
    reviewerName: string;
  }) => {
    const newReview: ProductReview = {
      id: Date.now().toString(),
      productId: reviewData.productId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      reviewerName: reviewData.reviewerName,
      date: new Date().toISOString(),
      verified: false,
    };

    setProductReviews(prev => [...prev, newReview]);
    setIsReviewModalOpen(false);
  };

  // Get product with reviews
  const getProductWithReviews = (product: Product): Product => {
    const reviews = productReviews.filter(review => review.productId === product.id);
    return {
      ...product,
      userReviews: reviews,
      reviews: product.reviews + reviews.length,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemsCount={getCartItemsCount()} 
        onCartOpen={() => setIsCartOpen(true)} 
      />
      
      <Hero onShopNow={handleShopNow} />
      
      <ReviewsSlider />
      
      <section ref={productsRef} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium electronics and accessories
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        total={getCartTotal()}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        total={getCartTotal()}
        onOrderComplete={handleOrderComplete}
      />

      <ProductDetailsModal
        product={selectedProduct ? getProductWithReviews(selectedProduct) : null}
        isOpen={isProductDetailsOpen}
        onClose={() => setIsProductDetailsOpen(false)}
        onAddToCart={(product) => {
          handleAddToCart(product);
          setIsProductDetailsOpen(false);
        }}
        onBuyNow={handleBuyNow}
        onWriteReview={handleWriteReview}
      />

      <ProductReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={selectedProduct}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default Index;

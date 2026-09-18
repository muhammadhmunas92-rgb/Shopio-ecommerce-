import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { fetchReviews, submitReview } from '../api/client';

export default function ProductDetailModal({ product, onClose }) {
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const { user } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  useEffect(() => {
    if (product?.id) {
      loadReviews();
    }
  }, [product?.id]);

  const loadReviews = async () => {
    try {
      const data = await fetchReviews(product.id);
      setReviews(data);
    } catch (err) {
      console.warn('Could not fetch reviews:', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setReviewMessage('Please sign in to write a review.');
      return;
    }
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const res = await submitReview(product.id, {
        userId: user.id,
        rating: newRating,
        comment: newComment
      });
      setReviews(prev => [res, ...prev]);
      setNewComment('');
      setReviewMessage('Thank you! Your review has been published.');
      setTimeout(() => setReviewMessage(''), 4000);
    } catch (err) {
      setReviewMessage(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!product) return null;

  const isFav = isFavorite(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-forme-cream rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/40 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/80 hover:bg-neutral-100 text-neutral-600 transition"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
          
          {/* Left: Product Imagery */}
          <div className="space-y-4">
            <div className="bg-forme-card rounded-2xl p-6 flex items-center justify-center shadow-inner min-h-[320px] sm:min-h-[400px]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto max-h-[380px] object-contain drop-shadow-xl"
              />
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-neutral-600">
              <div className="p-2 bg-white/50 rounded-xl">
                <Truck size={16} className="mx-auto mb-1 text-forme-terracotta" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="p-2 bg-white/50 rounded-xl">
                <Shield size={16} className="mx-auto mb-1 text-forme-terracotta" />
                <span>2-Year Warranty</span>
              </div>
              <div className="p-2 bg-white/50 rounded-xl">
                <RefreshCw size={16} className="mx-auto mb-1 text-forme-terracotta" />
                <span>Artisan Servicing</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-forme-terracotta text-white">
                  {product.badge || 'NEW'}
                </span>
                <span className="text-xs text-neutral-500 uppercase tracking-widest">
                  {product.categoryName || 'Sculptural Leather'}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 mt-2">
                {product.name}
              </h2>
              <p className="font-condensed text-lg text-neutral-600 tracking-wider">
                {product.modelNumber}
              </p>

              <div className="flex items-center space-x-3 mt-3">
                <span className="text-2xl font-serif text-neutral-900 font-semibold">
                  ${Number(product.price).toFixed(2)}
                </span>
                
                {/* Rating badge */}
                <div className="flex items-center space-x-1 bg-white px-2.5 py-1 rounded-full text-xs text-neutral-700 shadow-sm">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="font-medium">{product.averageRating || 5.0}</span>
                  <span className="text-neutral-400">({reviews.length} reviews)</span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Color & Specs */}
              <div className="mt-6 pt-4 border-t border-forme-border/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Color Palette:</span>
                  <span className="font-medium text-neutral-800">{product.color || 'Artisan Tan'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Materials:</span>
                  <span className="font-medium text-neutral-800">100% Full-grain Italian Calfskin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Availability:</span>
                  <span className="font-medium text-emerald-700">{product.stockQuantity} in studio stock</span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-neutral-300 rounded-full bg-white px-3 py-1.5">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="text-neutral-500 hover:text-neutral-900 px-2 text-sm font-semibold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-semibold text-neutral-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stockQuantity, q + 1))}
                      className="text-neutral-500 hover:text-neutral-900 px-2 text-sm font-semibold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addItem(product.id, quantity, product);
                    }}
                    className="flex-1 py-3 px-6 rounded-full bg-forme-navy hover:bg-forme-navy-dark text-white text-xs uppercase tracking-widest font-medium transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2 active:scale-95"
                  >
                    <ShoppingBag size={15} />
                    <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(product)}
                    className={`p-3 rounded-full border border-neutral-300 transition ${
                      isFav ? 'bg-forme-terracotta text-white border-forme-terracotta' : 'bg-white text-neutral-700 hover:text-forme-terracotta'
                    }`}
                    title={isFav ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>

            </div>

            {/* Customer Reviews Section */}
            <div className="mt-8 pt-6 border-t border-forme-border/60">
              <h3 className="font-serif text-lg text-neutral-900 mb-4">
                Collector Reviews ({reviews.length})
              </h3>

              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-2xl border border-forme-border/60 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-700">Write a Review</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="text-amber-400 hover:scale-110 transition"
                      >
                        <Star size={16} fill={star <= newRating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows="2"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your impressions on the leather quality, form, and ergonomics..."
                  className="w-full text-xs p-2.5 rounded-xl border border-neutral-200 outline-none focus:border-forme-terracotta resize-none"
                  required
                ></textarea>

                {reviewMessage && (
                  <p className={`text-xs ${reviewMessage.includes('published') ? 'text-emerald-600' : 'text-forme-terracotta'}`}>
                    {reviewMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2 rounded-xl bg-forme-terracotta hover:bg-forme-terracotta-hover text-white text-xs uppercase tracking-wider font-medium transition disabled:opacity-60"
                >
                  {submitting ? 'Publishing...' : 'Submit Review'}
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-white/70 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-800">{rev.userFullName || rev.username}</span>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={11} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

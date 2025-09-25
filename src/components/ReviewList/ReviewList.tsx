import React from 'react';
import { Review } from '../../utils/dataUtils';
import ReviewCard from '../ReviewCard';
import './ReviewList.css';

interface ReviewListProps {
  reviews: Review[];
  isLoading?: boolean;
  emptyMessage?: string;
  onClearSearch?: () => void;
  showClearButton?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  observerRef?: React.RefObject<HTMLDivElement | null>;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  isLoading = false,
  emptyMessage = "No reviews found.",
  onClearSearch,
  showClearButton = false,
  hasMore = false,
  isLoadingMore = false,
  observerRef
}) => {
  if (isLoading) {
    return (
      <div className="review-list">
        <div className="review-list__loading">
          <div className="loading-spinner"></div>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="review-list">
        <div className="review-list__empty">
          <p className="review-list__empty-message">{emptyMessage}</p>
          {showClearButton && onClearSearch && (
            <button 
              onClick={onClearSearch} 
              className="review-list__clear-btn"
            >
              Show All Reviews
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="review-list">
      <div className="review-list__grid">
        {reviews.map((review, index) => (
          <ReviewCard 
            key={`${review.url}-${index}`} 
            review={review} 
          />
        ))}
      </div>
      
      {/* Infinite scroll trigger element */}
      <div ref={observerRef} className="review-list__scroll-trigger">
        {hasMore && isLoadingMore && (
          <div className="review-list__loading-more">
            <div className="loading-spinner"></div>
            <p>Loading more reviews...</p>
          </div>
        )}
      </div>
      
      {/* End of results message */}
      {!hasMore && reviews.length > 0 && (
        <div className="review-list__end-message">
          <p>
            {reviews.length === 1 
              ? "1 result found." 
              : `${reviews.length} results found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;

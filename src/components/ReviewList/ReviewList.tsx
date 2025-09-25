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
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  isLoading = false,
  emptyMessage = "No reviews found.",
  onClearSearch,
  showClearButton = false
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
    </div>
  );
};

export default ReviewList;

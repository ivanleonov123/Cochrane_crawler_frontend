import React from 'react';
import { Review } from '../../utils/dataUtils';
import './ReviewCard.css';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-card__content">
        <h3 className="review-card__title">
          <a
            href={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="review-card__link"
          >
            {review.title}
          </a>
        </h3>
        
        <div className="review-card__meta">
          <div className="review-card__author">{review.author}</div>
          <div className="review-card__date">{review.date}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

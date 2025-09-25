import { useState, useEffect, useCallback } from 'react';
import { Review, extractUniqueTopics, filterReviewsByTopic, paginateReviews } from '../utils/dataUtils';
import cochraneReviews from '../data/cochrane_reviews.json';

const REVIEWS_PER_PAGE = 10;

export const useReviews = () => {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [uniqueTopics, setUniqueTopics] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load data on mount
  useEffect(() => {
    const loadData = () => {
      try {
        // Flatten the nested array structure from the JSON
        const flattenedReviews = cochraneReviews.flat();
        
        // Set all reviews
        setAllReviews(flattenedReviews);
        setFilteredReviews(flattenedReviews);
        
        // Extract unique topics for auto-suggestions
        const topics = extractUniqueTopics(flattenedReviews);
        setUniqueTopics(topics);
        
        // Set initial displayed reviews (first 10)
        setDisplayedReviews(flattenedReviews.slice(0, REVIEWS_PER_PAGE));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Update displayed reviews when filtered reviews change
  useEffect(() => {
    setDisplayedReviews(filteredReviews.slice(0, REVIEWS_PER_PAGE));
    setCurrentPage(0);
  }, [filteredReviews]);

  // Filter reviews by topic
  const filterByTopic = useCallback((topic: string) => {
    setSelectedTopic(topic);
    setSearchTerm(topic);
    const filtered = filterReviewsByTopic(allReviews, topic);
    setFilteredReviews(filtered);
  }, [allReviews]);

  // Clear search/filter
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSelectedTopic('');
    setFilteredReviews(allReviews);
  }, [allReviews]);

  // Load more reviews (for infinite scroll)
  const loadMoreReviews = useCallback(() => {
    const nextPage = currentPage + 1;
    const pagination = paginateReviews(filteredReviews, nextPage, REVIEWS_PER_PAGE);
    
    if (pagination.hasMore) {
      setDisplayedReviews(prev => [...prev, ...pagination.reviews]);
      setCurrentPage(nextPage);
    }
  }, [currentPage, filteredReviews]);

  return {
    displayedReviews,
    filteredReviews,
    selectedTopic,
    isLoading,
    setSearchTerm,
    filterByTopic,
    clearSearch,
    loadMoreReviews
  };
};

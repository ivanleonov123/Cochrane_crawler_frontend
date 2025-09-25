import { useState, useEffect, useCallback } from 'react';
import { Review, extractUniqueTopics, filterReviewsByTopic } from '../utils/dataUtils';
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
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

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
    // For search results, show first 10 and enable infinite scroll
    setDisplayedReviews(filtered.slice(0, REVIEWS_PER_PAGE));
    setCurrentPage(0);
  }, [allReviews]);

  // Clear search/filter
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setSelectedTopic('');
    setFilteredReviews(allReviews);
    // Reset to first page and enable infinite scroll
    setDisplayedReviews(allReviews.slice(0, REVIEWS_PER_PAGE));
    setCurrentPage(0);
  }, [allReviews]);

  // Load more reviews (for infinite scroll)
  const loadMoreReviews = useCallback(() => {
    if (isLoadingMore) return; // Prevent multiple simultaneous loads
    
    const nextPage = currentPage + 1;
    const startIndex = nextPage * REVIEWS_PER_PAGE;
    const endIndex = startIndex + REVIEWS_PER_PAGE;
    const nextBatch = filteredReviews.slice(startIndex, endIndex);
    
    if (nextBatch.length > 0) {
      setIsLoadingMore(true);
      
      // Simulate a small delay for better UX (remove in production if not needed)
      setTimeout(() => {
        setDisplayedReviews(prev => [...prev, ...nextBatch]);
        setCurrentPage(nextPage);
        setIsLoadingMore(false);
      }, 300);
    }
  }, [currentPage, filteredReviews, isLoadingMore]);

  // Calculate if there are more reviews to load
  const hasMore = useCallback(() => {
    const totalDisplayed = displayedReviews.length;
    const totalFiltered = filteredReviews.length;
    return totalDisplayed < totalFiltered;
  }, [displayedReviews.length, filteredReviews.length]);

  return {
    displayedReviews,
    filteredReviews,
    selectedTopic,
    isLoading,
    searchTerm,
    uniqueTopics,
    setSearchTerm,
    filterByTopic,
    clearSearch,
    loadMoreReviews,
    hasMore: hasMore(),
    isLoadingMore
  };
};

// Data utility functions for Cochrane Library reviews

export interface Review {
  url: string;
  topic: string;
  title: string;
  author: string;
  date: string;
}

/**
 * Extracts unique topics from an array of reviews
 * @param reviews Array of review objects
 * @returns Sorted array of unique topic names
 */
export const extractUniqueTopics = (reviews: Review[]): string[] => {
  return Array.from(new Set(reviews.map(review => review.topic))).sort();
};

/**
 * Filters reviews by topic name (case-insensitive)
 * @param reviews Array of review objects
 * @param topic Topic name to filter by
 * @returns Filtered array of reviews
 */
export const filterReviewsByTopic = (reviews: Review[], topic: string): Review[] => {
  if (!topic.trim()) {
    return reviews;
  }
  
  return reviews.filter(review => 
    review.topic.toLowerCase().includes(topic.toLowerCase())
  );
};

/**
 * Formats a date string for display
 * @param dateString Date string from the data
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString; // Return original string if parsing fails
  }
};

/**
 * Paginates an array of reviews
 * @param reviews Array of review objects
 * @param page Page number (0-based)
 * @param pageSize Number of items per page
 * @returns Object containing paginated reviews and pagination info
 */
export const paginateReviews = (
  reviews: Review[], 
  page: number, 
  pageSize: number
): { reviews: Review[]; hasMore: boolean; totalPages: number } => {
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedReviews = reviews.slice(startIndex, endIndex);
  const totalPages = Math.ceil(reviews.length / pageSize);
  
  return {
    reviews: paginatedReviews,
    hasMore: endIndex < reviews.length,
    totalPages
  };
};

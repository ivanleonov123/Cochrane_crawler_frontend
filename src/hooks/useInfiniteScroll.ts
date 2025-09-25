import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number; // Distance from bottom to trigger load (in pixels)
}

/**
 * Custom hook for implementing infinite scroll functionality
 * Uses Intersection Observer API to detect when user scrolls near bottom
 */
export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 100
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null, // Use viewport as root
      rootMargin: `${threshold}px`, // Trigger when element is 100px away from viewport
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [handleObserver, threshold]);

  return { observerRef };
};

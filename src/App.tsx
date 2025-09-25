import React from 'react';
import './styles/global.css';
import './App.css';
import { useReviews } from './hooks/useReviews';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import ReviewList from './components/ReviewList';
import SearchBox from './components/SearchBox';

function App() {
  // Use custom hook for data management
  const {
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
    hasMore,
    isLoadingMore
  } = useReviews();

  // Use infinite scroll hook
  const { observerRef } = useInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: loadMoreReviews,
    threshold: 100
  });

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <main className="container">
        <div className="reviews-container">
          <div className="reviews-header">
            <h2>Medical Research Reviews</h2>
            <p className="reviews-count">
              Showing {displayedReviews.length} of {filteredReviews.length} reviews
              {selectedTopic && ` for "${selectedTopic}"`}
            </p>
          </div>
          
          <div className="search-container">
            <SearchBox
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onTopicSelect={filterByTopic}
              onClearSearch={clearSearch}
              uniqueTopics={uniqueTopics}
              placeholder="Search by topic..."
            />
          </div>
          
          <ReviewList
            reviews={displayedReviews}
            isLoading={isLoading}
            emptyMessage={selectedTopic ? `No reviews found for "${selectedTopic}".` : "No reviews found."}
            onClearSearch={clearSearch}
            showClearButton={!!selectedTopic}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            observerRef={observerRef}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

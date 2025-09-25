import React from 'react';
import './styles/global.css';
import './App.css';
import { useReviews } from './hooks/useReviews';
import { useInfiniteScroll } from './hooks/useInfiniteScroll';
import ReviewList from './components/ReviewList';
import SearchBox from './components/SearchBox';
import TopicFilter from './components/TopicFilter';

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
          <div className="search-container">
            <div className="topic-filter-section">
              <TopicFilter
                selectedTopic={selectedTopic}
                onRemoveTopic={clearSearch}
              />
              {selectedTopic && (
                <p className="topic-filter-count">
                  <span className="topic-filter-number">{filteredReviews.length}</span> Cochrane Reviews matching <span className="topic-filter-category">{selectedTopic}</span> in Cochrane Topic
                </p>
              )}
            </div>
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

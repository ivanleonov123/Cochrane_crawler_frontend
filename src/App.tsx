import React from 'react';
import './styles/global.css';
import './App.css';
import { useReviews } from './hooks/useReviews';
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
    clearSearch
  } = useReviews();

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
          />
        </div>
      </main>
    </div>
  );
}

export default App;

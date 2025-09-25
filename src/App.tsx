import React from 'react';
import './styles/global.css';
import './App.css';
import { useReviews } from './hooks/useReviews';
import ReviewList from './components/ReviewList';

function App() {
  // Use custom hook for data management
  const {
    displayedReviews,
    filteredReviews,
    selectedTopic,
    isLoading
  } = useReviews();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cochrane Library Reviews</h1>
        <p>Search and explore medical research reviews from the Cochrane Library</p>
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
          
          <ReviewList
            reviews={displayedReviews}
            isLoading={isLoading}
            emptyMessage={selectedTopic ? `No reviews found for "${selectedTopic}".` : "No reviews found."}
            onClearSearch={() => window.location.reload()}
            showClearButton={!!selectedTopic}
          />
        </div>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useRef, useEffect } from 'react';
import './SearchBox.css';

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onTopicSelect: (topic: string) => void;
  uniqueTopics: string[];
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchChange,
  onTopicSelect,
  uniqueTopics,
  placeholder = "Search by topic..."
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter topics based on search term
  useEffect(() => {
    if (searchTerm.trim() && isFocused) {
      const filtered = uniqueTopics
        .filter(topic => 
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 10); // Show maximum 10 suggestions
      setFilteredTopics(filtered);
    } else {
      setFilteredTopics([]);
    }
  }, [searchTerm, uniqueTopics, isFocused]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  // Handle topic selection
  const handleTopicSelect = (topic: string) => {
    onSearchChange(topic);
    onTopicSelect(topic);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding dropdown to allow clicking on suggestions
    setTimeout(() => {
      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
        setIsFocused(false);
      }
    }, 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="search-box-container">
      <div className="search-box-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search reviews by topic"
          autoComplete="off"
        />
        <div className="search-icon">🔍</div>
      </div>
      
      {isFocused && filteredTopics.length > 0 && (
        <div ref={dropdownRef} className="search-suggestions">
          {filteredTopics.map((topic, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleTopicSelect(topic)}
              onMouseDown={(e) => e.preventDefault()} // Prevent input blur
            >
              {topic}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;

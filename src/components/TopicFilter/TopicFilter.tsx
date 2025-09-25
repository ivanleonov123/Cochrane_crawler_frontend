import React from 'react';
import './TopicFilter.css';

interface TopicFilterProps {
  selectedTopic: string;
  onRemoveTopic: () => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({
  selectedTopic,
  onRemoveTopic
}) => {
  if (!selectedTopic) {
    return null;
  }

  return (
    <div className="topic-filter">
      <span className="topic-filter-label">Topics:</span>
      <div className="topic-pill">
        <span className="topic-pill-text">{selectedTopic}</span>
        <button
          className="topic-pill-remove"
          onClick={onRemoveTopic}
          aria-label={`Remove ${selectedTopic} filter`}
          type="button"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TopicFilter;

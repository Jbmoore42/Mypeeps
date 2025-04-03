import React, { useState } from 'react';
import { BibleVerse } from '../App';
import './VerseHistory.css';

interface VerseHistoryProps {
  verses: BibleVerse[];
  onRestoreVerse: (verseId: string | undefined) => void;
  onDeleteVerse: (verseId: string | undefined) => void;
}

function VerseHistory({ verses, onRestoreVerse, onDeleteVerse }: VerseHistoryProps) {
  const [sortBy, setSortBy] = useState<'date' | 'reference'>('date');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedVerses = [...verses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.archivedDate || 0).getTime() - new Date(a.archivedDate || 0).getTime();
    }
    return a.reference.localeCompare(b.reference);
  });

  const filteredVerses = sortedVerses.filter(verse => 
    verse.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verse.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="verse-history">
      <div className="history-controls">
        <input
          type="text"
          placeholder="Search verses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value as 'date' | 'reference')}
          className="sort-select"
        >
          <option value="date">Sort by Date</option>
          <option value="reference">Sort by Reference</option>
        </select>
      </div>

      <div className="archived-verses">
        {filteredVerses.map((verse, index) => (
          <div key={index} className="archived-verse-card">
            <div className="verse-header">
              <h3>{verse.reference}</h3>
              <div className="verse-actions">
                <button
                  className="restore-button"
                  onClick={() => onRestoreVerse(verse.id)}
                  title="Restore discussion"
                >
                  ↩️
                </button>
                <button
                  className="delete-verse-button"
                  onClick={() => onDeleteVerse(verse.id)}
                  title="Delete permanently"
                >
                  ×
                </button>
              </div>
            </div>
            <p className="verse-text">{verse.text}</p>
            <p className="verse-meta">
              Archived on: {new Date(verse.archivedDate || '').toLocaleDateString()}
            </p>
            <div className="discussion-summary">
              <p>{verse.comments.length} comments</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerseHistory; 
import React, { useState } from 'react';
import { BibleVerse } from '../App';
import './AddVerseForm.css';

interface AddVerseFormProps {
  onAdd: (verse: BibleVerse) => void;
  onClose: () => void;
}

// Example verses data
const exampleVerses = [
  {
    reference: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me."
  },
  {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd; I shall not want."
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
  }
];

function AddVerseForm({ onAdd, onClose }: AddVerseFormProps) {
  const [formData, setFormData] = useState<Omit<BibleVerse, 'comments'>>({
    reference: '',
    text: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ ...formData, comments: [] });
    setFormData({ reference: '', text: '', notes: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExampleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVerse = exampleVerses.find(verse => verse.reference === e.target.value);
    if (selectedVerse) {
      setFormData(prev => ({
        ...prev,
        reference: selectedVerse.reference,
        text: selectedVerse.text
      }));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Share a Bible Verse</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="example-verses">Choose from examples:</label>
            <select
              id="example-verses"
              className="verse-select"
              onChange={handleExampleSelect}
              value=""
            >
              <option value="">-- Select a verse --</option>
              {exampleVerses.map(verse => (
                <option key={verse.reference} value={verse.reference}>
                  {verse.reference}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="reference">Reference:</label>
            <input
              type="text"
              id="reference"
              name="reference"
              placeholder="e.g., John 3:16"
              value={formData.reference}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Verse Text:</label>
            <textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Your Thoughts:</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Share what this verse means to you..."
            />
          </div>
          <button type="submit" className="submit-button">Share Verse</button>
        </form>
      </div>
    </div>
  );
}

export default AddVerseForm; 
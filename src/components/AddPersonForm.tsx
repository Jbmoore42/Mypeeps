import React, { useState } from 'react';
import './AddPersonForm.css';

interface Person {
  name: string;
  role: string;
  notes: string;
}

interface AddPersonFormProps {
  onAdd: (person: Person) => void;
  onClose: () => void;
}

function AddPersonForm({ onAdd, onClose }: AddPersonFormProps) {
  const [formData, setFormData] = useState<Person>({
    name: '',
    role: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', role: '', notes: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Add New Person</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <button type="submit" className="submit-button">Add Person</button>
        </form>
      </div>
    </div>
  );
}

export default AddPersonForm; 
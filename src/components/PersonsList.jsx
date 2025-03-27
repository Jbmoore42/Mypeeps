import React from 'react';
import './PersonsList.css';

function PersonsList({ persons }) {
  if (persons.length === 0) {
    return <p className="no-persons">No persons added yet</p>;
  }

  return (
    <div className="persons-list">
      {persons.map((person, index) => (
        <div key={index} className="person-card">
          <h3>{person.name}</h3>
          <p><strong>Role:</strong> {person.role}</p>
          <p><strong>Notes:</strong> {person.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default PersonsList; 
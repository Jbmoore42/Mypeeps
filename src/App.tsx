import { useState } from 'react';
import PersonsList from './components/PersonsList.tsx';
import AddPersonForm from './components/AddPersonForm.tsx';
import './App.css';

interface Person {
  id?: string;
  name: string;
  role: string;
  notes: string;
}

function App() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const handleAddPerson = (newPerson: Person) => {
    setPersons([...persons, newPerson]);
    setIsAddFormOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Research Persons Tracker</h1>
      </header>
      <main>
        <PersonsList persons={persons} />
        <button 
          className="add-button"
          onClick={() => setIsAddFormOpen(true)}
        >
          +
        </button>
        {isAddFormOpen && (
          <AddPersonForm 
            onAdd={handleAddPerson}
            onClose={() => setIsAddFormOpen(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App; 
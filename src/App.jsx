import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useAuth } from './contexts/AuthContext.jsx';
import PersonsList from './components/PersonsList.jsx';
import AddPersonForm from './components/AddPersonForm.jsx';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  let auth;
  try {
    auth = useAuth();
  } catch (error) {
    console.error("Error using auth:", error);
    return <div>Error loading authentication</div>;
  }

  const { currentUser, logout } = auth;
  const [persons, setPersons] = useState([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setPersons([]);
      return;
    }

    const q = query(
      collection(db, 'persons'),
      where('userId', '==', currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const personsData = [];
      snapshot.forEach((doc) => {
        personsData.push({ id: doc.id, ...doc.data() });
      });
      setPersons(personsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleAddPerson = async (newPerson) => {
    try {
      await addDoc(collection(db, 'persons'), {
        ...newPerson,
        userId: currentUser.uid,
        createdAt: new Date()
      });
      setIsAddFormOpen(false);
    } catch (error) {
      console.error('Error adding person:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) {
    return showLogin ? (
      <Login onToggleAuth={() => setShowLogin(false)} />
    ) : (
      <Signup onToggleAuth={() => setShowLogin(true)} />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Research Persons Tracker</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
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
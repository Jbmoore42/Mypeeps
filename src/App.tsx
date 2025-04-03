import { useState } from 'react';
import VerseList from './components/VerseList.tsx';
import AddVerseForm from './components/AddVerseForm.tsx';
import VerseHistory from './components/VerseHistory';
import { ImagePreloader } from './components/ImagePreloader';
import DailyVerse from './components/DailyVerse';
import './App.css';

export interface Reply {
  id?: string;
  author: string;
  text: string;
  timestamp: Date;
}

export interface Comment {
  id?: string;
  author: string;
  text: string;
  timestamp: Date;
  replies: Reply[];
}

export interface BibleVerse {
  id?: string;
  reference: string;  // e.g., "John 3:16"
  text: string;
  notes: string;
  comments: Comment[];
  archivedDate?: Date;
}

function App() {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [archivedVerses, setArchivedVerses] = useState<BibleVerse[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const handleAddVerse = (newVerse: BibleVerse) => {
    setVerses([...verses, { ...newVerse, comments: [] }]);
    setIsAddFormOpen(false);
  };

  const handleAddComment = (verseId: string | undefined, comment: Comment) => {
    setVerses(verses.map(verse => 
      verse.id === verseId 
        ? { ...verse, comments: [...verse.comments, comment] }
        : verse
    ));
  };

  const handleDeleteComment = (verseId: string | undefined, commentId: string | undefined) => {
    setVerses(verses.map(verse => 
      verse.id === verseId 
        ? { ...verse, comments: verse.comments.filter(comment => comment.id !== commentId) }
        : verse
    ));
  };

  const handleDeleteReply = (verseId: string | undefined, commentId: string | undefined, replyId: string | undefined) => {
    setVerses(verses.map(verse => 
      verse.id === verseId 
        ? {
            ...verse,
            comments: verse.comments.map(comment => 
              comment.id === commentId
                ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
                : comment
            )
          }
        : verse
    ));
  };

  const handleDeleteVerse = (verseId: string | undefined) => {
    setVerses(verses.filter(verse => verse.id !== verseId));
  };

  const handleArchiveVerse = (verseId: string | undefined) => {
    const verseToArchive = verses.find(v => v.id === verseId);
    if (verseToArchive) {
      setArchivedVerses([...archivedVerses, { ...verseToArchive, archivedDate: new Date() }]);
      setVerses(verses.filter(v => v.id !== verseId));
    }
  };

  const handleRestoreVerse = (verseId: string | undefined) => {
    const verseToRestore = archivedVerses.find(v => v.id === verseId);
    if (verseToRestore) {
      setVerses([...verses, verseToRestore]);
      setArchivedVerses(archivedVerses.filter(v => v.id !== verseId));
    }
  };

  return (
    <div className="App">
      <ImagePreloader />
      <header className="App-header">
        <div className="header-content">
          <div className="cross-left">✟</div>
          <h1>Bible Verse Discussions</h1>
          <div className="cross-right">✟</div>
        </div>
      </header>

      <main>
        <DailyVerse />
        {showArchive ? (
          <>
            <VerseHistory 
              verses={archivedVerses}
              onRestoreVerse={handleRestoreVerse}
              onDeleteVerse={handleDeleteVerse}
            />
            <div className="action-buttons">
              <button 
                className="history-button"
                onClick={() => setShowArchive(false)}
                title="Return to Current Discussions"
              >
                📖 Current Discussions
              </button>
            </div>
          </>
        ) : (
          <>
            <VerseList 
              verses={verses}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              onDeleteReply={handleDeleteReply}
              onDeleteVerse={handleDeleteVerse}
              onArchiveVerse={handleArchiveVerse}
            />
            <div className="action-buttons">
              <a 
                href="https://www.biblegateway.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bible-link"
              >
                📖 Find a Verse
              </a>
              <button 
                className="history-button"
                onClick={() => setShowArchive(true)}
                title="View Past Discussions"
              >
                📚 Past Discussions
              </button>
              <button 
                className="add-button"
                onClick={() => setIsAddFormOpen(true)}
              >
                +
              </button>
            </div>
          </>
        )}
        {isAddFormOpen && (
          <AddVerseForm 
            onAdd={handleAddVerse}
            onClose={() => setIsAddFormOpen(false)}
          />
        )}
      </main>
    </div>
  );
}

export default App; 
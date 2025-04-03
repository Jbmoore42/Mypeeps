import React, { useState } from 'react';
import { BibleVerse, Comment, Reply } from '../App';
import './VerseList.css';

interface VerseListProps {
  verses: BibleVerse[];
  onAddComment: (verseId: string | undefined, comment: Comment) => void;
  onDeleteComment: (verseId: string | undefined, commentId: string | undefined) => void;
  onDeleteReply: (verseId: string | undefined, commentId: string | undefined, replyId: string | undefined) => void;
  onDeleteVerse: (verseId: string | undefined) => void;
}

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
};

function VerseList({ verses, onAddComment, onDeleteComment, onDeleteReply, onDeleteVerse }: VerseListProps) {
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [newReplies, setNewReplies] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleCommentSubmit = (verseId: string | undefined) => {
    if (!newComments[verseId || '']) return;

    const comment: Comment = {
      author: 'Anonymous', // You can add user authentication later
      text: newComments[verseId || ''],
      timestamp: new Date(),
      replies: []
    };

    onAddComment(verseId, comment);
    setNewComments({ ...newComments, [verseId || '']: '' });
  };

  const handleReplySubmit = (verseId: string | undefined, commentId: string) => {
    if (!newReplies[commentId]) return;

    const reply: Reply = {
      author: 'Anonymous', // You can add user authentication later
      text: newReplies[commentId],
      timestamp: new Date()
    };

    const updatedVerses = verses.map(verse => {
      if (verse.id === verseId) {
        return {
          ...verse,
          comments: verse.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), reply]
              };
            }
            return comment;
          })
        };
      }
      return verse;
    });

    // Update the verses state in the parent component
    setNewReplies({ ...newReplies, [commentId]: '' });
    setReplyingTo(null);
  };

  if (verses.length === 0) {
    return <p className="no-verses">No verses added yet</p>;
  }

  return (
    <div className="verses-list">
      {verses.map((verse, index) => (
        <div key={index} className="verse-card">
          <div className="verse-header">
            <h3>{verse.reference}</h3>
            <div className="verse-actions">
              <button 
                className="speak-button"
                onClick={() => speak(verse.text)}
                title="Listen to verse"
              >
                🔊
              </button>
              <button 
                className="delete-verse-button"
                onClick={() => onDeleteVerse(verse.id)}
                title="Delete verse discussion"
              >
                ×
              </button>
            </div>
          </div>
          <p className="verse-text">{verse.text}</p>
          <p className="verse-notes">{verse.notes}</p>
          
          <div className="comments-section">
            <h4>Discussion</h4>
            {verse.comments.map((comment, cIndex) => (
              <div key={cIndex} className="comment">
                <div className="comment-header">
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-actions">
                    <button 
                      className="speak-button"
                      onClick={() => speak(comment.text)}
                      title="Listen to comment"
                    >
                      🔊
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => onDeleteComment(verse.id, comment.id)}
                      title="Delete comment"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <p className="comment-meta">
                  By {comment.author} on {comment.timestamp.toLocaleDateString()}
                  <button 
                    className="reply-button"
                    onClick={() => setReplyingTo(comment.id)}
                  >
                    Reply
                  </button>
                </p>

                {/* Replies section */}
                <div className="replies-section">
                  {comment.replies?.map((reply, rIndex) => (
                    <div key={rIndex} className="reply">
                      <div className="reply-header">
                        <p className="reply-text">{reply.text}</p>
                        <div className="reply-actions">
                          <button 
                            className="speak-button"
                            onClick={() => speak(reply.text)}
                            title="Listen to reply"
                          >
                            🔊
                          </button>
                          <button 
                            className="delete-button"
                            onClick={() => onDeleteReply(verse.id, comment.id, reply.id)}
                            title="Delete reply"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      <p className="reply-meta">
                        By {reply.author} on {reply.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Reply form */}
                {replyingTo === comment.id && (
                  <div className="reply-form">
                    <textarea
                      value={newReplies[comment.id] || ''}
                      onChange={(e) => setNewReplies({
                        ...newReplies,
                        [comment.id]: e.target.value
                      })}
                      placeholder="Write your reply..."
                    />
                    <div className="reply-actions">
                      <button 
                        onClick={() => handleReplySubmit(verse.id, comment.id)}
                        disabled={!newReplies[comment.id]}
                      >
                        Submit Reply
                      </button>
                      <button 
                        className="cancel-button"
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="add-comment">
              <textarea
                value={newComments[verse.id || ''] || ''}
                onChange={(e) => setNewComments({
                  ...newComments,
                  [verse.id || '']: e.target.value
                })}
                placeholder="Add to the discussion..."
              />
              <button 
                onClick={() => handleCommentSubmit(verse.id)}
                disabled={!newComments[verse.id || '']}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VerseList; 
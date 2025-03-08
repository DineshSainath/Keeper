import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  getUserNotes,
  addNote as addNoteToDb,
  deleteNote as deleteNoteFromDb,
} from "../config/firebase";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./Auth/Profile";
import PrivateRoute from "./Auth/PrivateRoute";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load notes from Firestore when user is authenticated
  useEffect(() => {
    async function fetchNotes() {
      if (currentUser) {
        try {
          setLoading(true);
          console.log(
            "Fetching notes for user in App component:",
            currentUser.uid
          );
          const userNotes = await getUserNotes(currentUser.uid);
          console.log("Notes fetched in App component:", userNotes);
          setNotes(userNotes);
        } catch (error) {
          console.error("Error fetching notes in App component:", error);
          setNotes([]);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No user logged in, clearing notes");
        setNotes([]);
        setLoading(false);
      }
    }

    fetchNotes();
  }, [currentUser]);

  async function addNote(newNote) {
    console.log("Adding note in App component:", newNote);
    if (currentUser) {
      try {
        const addedNote = await addNoteToDb(currentUser.uid, newNote);
        if (addedNote) {
          console.log("Note added successfully:", addedNote);
          setNotes((prevNotes) => [...prevNotes, addedNote]);
        } else {
          console.error("Failed to add note - no note returned from database");
        }
      } catch (error) {
        console.error("Error adding note in App component:", error);
      }
    } else {
      // For non-authenticated users, keep the original behavior
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
  }

  async function deleteNote(id) {
    console.log("Deleting note at index:", id);
    if (currentUser) {
      try {
        // Find the note by index
        const noteToDelete = notes[id];
        console.log("Note to delete:", noteToDelete);

        if (noteToDelete && noteToDelete.id) {
          console.log("Deleting note with ID:", noteToDelete.id);
          const success = await deleteNoteFromDb(noteToDelete.id);
          if (success) {
            console.log("Note deleted successfully");
            setNotes((prevNotes) =>
              prevNotes.filter((_, index) => index !== id)
            );
          } else {
            console.error("Failed to delete note from database");
          }
        } else {
          console.error("Cannot delete note - no ID found");
        }
      } catch (error) {
        console.error("Error deleting note in App component:", error);
      }
    } else {
      // For non-authenticated users, keep the original behavior
      setNotes((prevNotes) => prevNotes.filter((_, index) => index !== id));
    }
  }

  const HomeComponent = () => (
    <div>
      <CreateArea onAdd={addNote} />
      {loading ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Loading notes...
        </p>
      ) : notes.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No notes yet. Create your first note!
        </p>
      ) : (
        notes.map((noteItem, index) => (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        ))
      )}
    </div>
  );

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={HomeComponent} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

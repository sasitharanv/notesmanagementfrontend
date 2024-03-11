import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import NoteCard from "../Components/NoteCard"; 

function Home() {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the stored token

    try {
      // Decode the token to get user ID
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.sub;
      console.log(decodedToken)
      setUserId(userId);

      // Fetch notes using the user ID
      fetch(`http://localhost:8080/getnotes/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the Authorization header
        }
      })
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Error fetching data: ', error));
    } catch (error) {
      console.error('Error decoding token:', error.message);
    }
  }, []);

  return (
    <div className="Home">
      <h2 className="home">Notes for User {userId}</h2>
      <div className="note-list">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

export default Home;

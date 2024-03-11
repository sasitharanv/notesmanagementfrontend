import React, { useEffect, useState } from "react";
import "../Home/Home.css"
import SideBar from "../../Components/SideBar/SideBar";
import NoteCard from "../../Components/NoteCard/NoteCard";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router-dom";
function CategoryFilter() {
    const{categoryId}=useParams();
  const user = jwt_decode(localStorage.getItem("token"));
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/authenticated/filterByCategory/${user.userId}/${categoryId}`, {
       
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        setNotes(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])

  return (
    <>
      <Loading loading={loading} />
      <SideBar />
      <div className="home-container">
        <div className="user-name-home">
          <span style={{ "fontSize": "50px" }}>H</span>ello &nbsp;
          <span className="user-name">{user?.UserName} </span>
          <span className="emoji">👋</span>
        </div>
        <div className="content-container notes-container">
          {
            notes.map((note, index) => {
              return (
                <NoteCard key={index} note={note} index={index}></NoteCard>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
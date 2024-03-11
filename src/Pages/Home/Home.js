import React, { useEffect, useState } from "react";
import "./Home.css"
import SideBar from "../../Components/SideBar/SideBar";
import NoteCard from "../../Components/NoteCard/NoteCard";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Loading from "../../Components/Loading/Loading";
function Home() {
  const user = jwt_decode(localStorage.getItem("token"));
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false)
  const [resetHomePageData, setResetHomePageData] = useState(1)
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/api/authenticated/getnotes/${user.userId}`, {
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

  }, [resetHomePageData])

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
                <NoteCard key={index} note={note} index={index} resetHomePageData={resetHomePageData} setResetHomePageData={setResetHomePageData}></NoteCard>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default Home;
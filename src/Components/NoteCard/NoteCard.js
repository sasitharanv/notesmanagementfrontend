import React, { useState } from "react";
import './NoteCard.css';
import EditNote from "./EditNote";
import Swal from 'sweetalert2';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import AddCategory from "./AddCategory";
const NoteCard = ({ note, index, resetHomePageData, setResetHomePageData }) => {
  const [notePreview, setNotePreview] = useState(null);
  const [mode, setMode] = useState("view");
  const user = jwt_decode(localStorage.getItem("token"));
  const [viewCategory, setViewCategory] = useState(false);

  const closePreview = () => {
    setNotePreview(null);
    setMode("view");
  }

  const handleMode = () => {
    setMode(mode === "view" ? "edit" : "view");
  }

  // Delete Note
  const deleteHandler = async () => {
    await Swal.fire({
      title: "",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios(
          {
            method: "DELETE",
            url: `http://localhost:8080/api/authenticated/delete/${user.userId}/${note.id}`,
            data: {

            },
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }
        ).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Updated!",
              text: "Your Note has been updated.",
              icon: "success"
            });
            setResetHomePageData(resetHomePageData+1)
          }
        }).catch((err) => {
          console.log(err);
        })

      }
    });
    setNotePreview(null)
  }

  const archivedHandler = async () => {
    await Swal.fire({
      title: "",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Archive it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "PUT",
          url: `http://localhost:8080/api/authenticated/archive/${user.userId}/${note.id}`,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Archived!",
              text: "Your Note has been archived.",
              icon: "success"
            });
            setResetHomePageData(resetHomePageData+1);
          }
        }).catch((err) => {
          console.log(err);
        });
      }
    });
    setNotePreview(null);
  }

  const addCategoryHandler = () => {
    setViewCategory((viewCategory) ? false : true)
  }

  const removeCategoryHandler = async () => {
    await Swal.fire({
      title: "",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios(
          {
            method: "PUT",
            url: `http://localhost:8080/api/authenticated/removecategory/${user.userId}/${note.id}`,
            data: {

            },
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }
        ).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted !",
              text: "Your Category for Note has been deleted.",
              icon: "success"
            });
          }
        }).catch((err) => {
          console.log(err);
        })

      }
    });
    setNotePreview(null)
  }
  return (
    <>
      <div className="note-card" onClick={() => { setNotePreview("Note") }}>
        <div className="note-header">
          <h3>{note.title}</h3>
        </div>
        <div className="note-content">
          <p>{note.content}</p>
        </div>
        <div className="divider"></div>
        <div className="note-footer">
          <span>Created: {note.createdDate}</span>
          <span>Last Edited: {note.lastEditedDate || 'N/A'}</span>
          <span>Category: {note?.category?.categoryName || 'N/A'}</span>
        </div>
      </div>
      {
        notePreview &&
        <>
          <div className="note-preview-container" onClick={closePreview} />
          <div className="note-preview">
            <div className="note-preview-buttons">
              <button onClick={closePreview} className="note-preview-button">
                Close
                <i class="sidebar-icon fa-solid fa-xmark"></i>
              </button>
              <button className="note-preview-button" onClick={handleMode}>
                {
                  (mode === "view")
                    ?
                    <span>
                      Edit
                      <i class="sidebar-icon fa-regular fa-pen-to-square"></i>
                    </span>
                    :
                    <span>
                      Cancel
                      <i class="sidebar-icon fa-solid fa-ban"></i>
                    </span>
                }

              </button>
              <button className="note-preview-button" onClick={deleteHandler}>
                Delete
                <i class="sidebar-icon fa-regular fa-trash-can"></i>
              </button>
              {
                (note?.category === null)
                  ? <button className="note-preview-button" onClick={addCategoryHandler}>
                    Add Category
                    <i class="sidebar-icon fa-solid fa-plus"></i>
                  </button>
                  :
                  <div style={{ "display": "flex", "gap": "10px" }}>
                    <div className="category-show">
                      Category: {" " + note?.category?.categoryName}
                    </div>
                    <button className="note-preview-button" onClick={removeCategoryHandler}>
                      Remove Category
                      <i class="sidebar-icon fa-regular fa-trash-can"></i>
                    </button>
                  </div>
              }
               <button className="note-preview-button" onClick={archivedHandler}>
                      Archive Note 
                      <i class=" sidebar-icon fa-solid fa-box-archive"></i>
                    </button>

              {
                (viewCategory)
                  ?
                  <AddCategory noteId={note.id} userId={user.userId} />
                  :
                  null
              }
            </div>
            {
              (mode === "view")
                ?
                <>
                  <div className="preview-title">{note.title}</div>
                  <div className="preview-date">Created: {note.createdDate}</div>
                  <div className="preview-date">Last Edited: {note.lastEditedDate || 'N/A'}</div>
                  <div className="note-preview-note-content">
                    <div>{note.content}</div>
                  </div>
                </>
                : <EditNote title={note.title} content={note.content} changeMode={setMode} id={note.id} resetHomePageData={resetHomePageData} setResetHomePageData={setResetHomePageData}/>
            }


          </div>
        </>
      }
    </>

  );
};

export default NoteCard;

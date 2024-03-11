import { useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./AddNotes.css"
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
const AddNotes = () => {
    const user = jwt_decode(localStorage.getItem("token"));
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const addNoteHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axios(
            {
                method: "POST",
                url: `http://localhost:8080/api/authenticated/add/${user.userId}`,
                data: {
                    title: title,
                    content: content
                },
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Added!",
                    text: "Your Note has been Added.",
                    icon: "success"
                });
                setContent("");
                setTitle("");
                setLoading(false)
                navigate("/home")
            }
        }).catch((err) => {
            console.log(err);
        })

    }
    return (
        <>
            <Loading loading={loading} />
            <SideBar />
            <div className="home-container">
                <div className="user-name-home"> hello <span className="user-name">{"Lorem Ips"} </span>
                    <span className="emoji">👋</span>
                </div>
                <div className="content-container">
                    <h3>Add Note</h3>
                    <form onSubmit={addNoteHandler}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                className="form-control"
                                id="content"
                                name="content"
                                value={content}
                                onChange={(e) => { setContent(e.target.value) }}
                            ></textarea>
                        </div>
                        <button disabled={(loading) ? true : false} type="submit" className="btn btn-primary">{(loading) ? "Loading" : "Submit"}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddNotes;
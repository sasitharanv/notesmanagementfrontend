import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import jwt_decode from "jwt-decode";
import axios from 'axios';
const EditNote = ({ title, content, changeMode, id, resetHomePageData, setResetHomePageData }) => {
    const user = jwt_decode(localStorage.getItem("token"));
    const [formTitle, setFormTitle] = useState();
    const [formContent, setFormContent] = useState();
    useEffect(() => {
        setFormTitle(title);
        setFormContent(content);
    }, [title, content])
    const editHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios(
                    {
                        method: "POST",
                        url: `http://localhost:8080/api/authenticated/update/${user.userId}/${id}`,
                        data: {
                            title: formTitle,
                            content: formContent
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

                changeMode("view")
            }
        });
    }
    return (
        <>
            <h3>Edit Note</h3>
            <form onSubmit={editHandler}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formTitle}
                        onChange={(e) => { setFormTitle(e.target.value) }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        value={formContent}
                        onChange={(e) => { setFormContent(e.target.value) }}
                        rows={5}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </>
    );
}
export default EditNote
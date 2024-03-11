import { useState } from "react";
import "./AddCategory.css"
import jwt_decode from "jwt-decode";
import axios from 'axios';
import Swal from 'sweetalert2'
const AddCategory = ({ noteId, userId }) => {
    const user = jwt_decode(localStorage.getItem("token"));
    const [category, setCategory] = useState("");
    const addCategoryHandler = (e) => {
        e.preventDefault();
        axios(
            {
                method: "POST",
                url: `http://localhost:8080/api/authenticated/addcategory?noteId=${noteId}`,
                data: {
                    categoryName: category,
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
                    text: "Category has been Added.",
                    icon: "success"
                });
                setCategory()
            }
        }).catch((err) => {
            console.log(err);
        })

    }
    return (
        <>
            <form style={{ "display": "flex", "gap": "10px" }} onSubmit={addCategoryHandler}>
                <input
                    style={{ "padding": "10px" }}
                    type="text"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }}
                    placeholder="Category"
                    className="input-category"
                >
                </input>
                <button className="add-category-button" type="submit">Add Category</button>
            </form>
        </>
    );
}
export default AddCategory;
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from 'axios';
import CategoryfilterButton from "../CategoryfilterButton";
import { Link } from "react-router-dom";

const SidebarLinks = ({ handleCategoryClick }) => {
    const [distinctCategories, setDistinctCategories] = useState([]);
    const user = jwt_decode(localStorage.getItem("token"));
    useEffect(() => {
        //   const user = JSON.parse(localStorage.getItem("user"));
        axios({
            method: "GET",
            url: `http://localhost:8080/api/authenticated/distinctcategory/${user.userId}`,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((res) => {
            setDistinctCategories(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="side-bar-links">
            <ul>
                {distinctCategories.map((category, index) => (
                    <div> <Link className="side-bar-link" to={"/home/category/"+category.id}>{category.categoryName}</Link>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default SidebarLinks;
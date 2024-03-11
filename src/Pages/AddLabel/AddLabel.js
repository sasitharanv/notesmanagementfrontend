import SideBar from "../../Components/SideBar/SideBar";
import "./AddLabel.css"

const AddLabel = () => {
    return (
        <>
            <SideBar />
            <div className="home-container">
                <div className="user-name-home"> hello <span className="user-name">{"Lorem Ips"} </span>
                    <span className="emoji">👋</span>
                </div>
                <div className="content-container">
                    <h3>Add Label</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddLabel;
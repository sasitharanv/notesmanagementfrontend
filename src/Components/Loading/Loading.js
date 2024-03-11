import "./Loading.css"
const Loading = ({ loading }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div class="loader"></div>
            </div>
        )
    } else {
        return null;
    }

}
export default Loading;
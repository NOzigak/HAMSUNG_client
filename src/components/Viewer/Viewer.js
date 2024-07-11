import "./Viewer.css";


const Viewer = ({username, created_at, place, description}) => {
    return (
        <div className="viewer">
            <div className="viewInfo">
                <p>작성자 : {username}</p>
                <p>Date : {new Date(created_at).toLocaleDateString()}</p>
                <p>장소 : {place}</p>
            </div>
            <div className="descSection">
                <pre>{description}</pre>
            </div>
        </div>
    )
}

export default Viewer;

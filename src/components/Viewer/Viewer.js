import "./Viewer.css";


const Viewer = ({username, created_at, place, description, mode}) => {
    return (
        <div className="viewer">
            <div className="viewInfo">
            {mode !== "notice" && (
                    <>
                        <p>작성자 : {username}</p>
                        <p>Date : {new Date(created_at).toLocaleDateString()}</p>
                        <p>장소 : {place}</p>
                    </>
                )}
                {/* mode가 notice이면 날짜 정보만 보임 */}
                {mode === "notice" && (
                    <>
                        <p>Date : {new Date(created_at).toLocaleDateString()}</p>
                    </>
                )}
            </div>
            <div className="descSection">
                <pre>{description}</pre>
            </div>
        </div>
    )
}

export default Viewer;

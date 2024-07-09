import { useNavigate } from "react-router-dom"
import "./BoardItem.css";

const BoardItem = ({id, category, username, title, place, isRecruit, created_at}) => {
    const nav = useNavigate();
    const recruitStatus = () => {
        if(isRecruit){
            return "모집중"
        } else if (!isRecruit){
            return "모집완료"
        }
    }

    const status = recruitStatus();
    return (
        <div className="boardItem" onClick={()=>nav(`/viewBoard/${id}`)}>
            <div className="ItemWrapper">
                <div className="columnBasic">
                    {category}
                </div>
                <div className="columnBasic">
                    {username}
                </div>
                <div className="columnTitle">
                    {title}
                </div>
                <div className="columnBasic">
                    {place}
                </div>
                <div className="columnBasic">
                    {status}
                </div>
                <div className="columnBasic">
                    {new Date(created_at).toLocaleDateString()}
                </div>
            </div>

        </div>
    )
}

export default BoardItem;
import { useSelector } from "react-redux";
import { PostCard } from "../PostCard/PostCard";
import "./CardList.css";

export const CardList = (data) => {

    const boardDetail = useSelector(state => state.board.boards);
    const sortedData = boardDetail.slice().sort((a, b) => b.view - a.view);

    return (
        <div className="cardList">
            <div className="listWrapper">
                {sortedData.slice(0, 3).map((item) => <PostCard key={item.id} {...item}/>)}
            </div>
        </div>
    )
}
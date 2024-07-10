import { useSelector } from "react-redux";
import { PostCard } from "../PostCard/PostCard";
import "./CardList.css";

export const CardList = (data) => {

    const boardData = useSelector(state => state.boards);
    //const boardData = data;
    console.log(boardData);
    const sortedData = boardData.slice().sort((a, b) => b.view - a.view);

    return (
        <div className="cardList">
            <div className="listWrapper">
                {sortedData.slice(0, 3).map((item) => <PostCard key={item.id} {...item}/>)}
            </div>
        </div>
    )
}
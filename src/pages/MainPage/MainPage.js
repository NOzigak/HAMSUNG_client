import BoardList from "../../components/BoardList/BoardList";
import { CardList } from "../../components/CardList/CardList";
import { Navbar } from "../../components/Navbar/Navbar";
import "./MainPage.css";
import {useSelector} from "react-redux";

const MainPage = () =>{


  const boardData = useSelector(state => state.boards);
  // const boardsData = useSelector(state => state.board); // 서버로부터 받아온 모집글 리스트
  
    return(
        <div>
          <Navbar />
          <div className="popular_study">
            <div className="top_study">
              <h2>스터디 TOP 3</h2>
            </div>
            <CardList data={boardData}/>
          </div>
          <div className="boardList">
            <BoardList />
          </div>
        </div>
    )
}

export default MainPage;
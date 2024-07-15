import { useEffect } from "react";
import BoardList from "../../components/BoardList/BoardList";
import { CardList } from "../../components/CardList/CardList";
import { Navbar } from "../../components/Navbar/Navbar";
import "./MainPage.css";
import {useDispatch, useSelector} from "react-redux";
import { getBoards } from "../../actions/boardAction";

const MainPage = () =>{


  const dispatch = useDispatch();
  // 메인페이지 접속시 전체 스터디 리스트를 조회하는 요청
  useEffect(()=> {
    dispatch(getBoards());
  }, [])

  const boardData = useSelector(state => state.board.boards); // 서버로부터 받아온 모집글 리스트
  
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
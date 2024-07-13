
import { useEffect, useState } from "react";
import "./BoardList.css";
import RecruitBtn from "../RecruitBtn/RecruitBtn";
import { useNavigate } from "react-router-dom";
import BoardItem from "../BoardItem/BoardItem";
import {useDispatch, useSelector} from "react-redux";
import { getBoards } from "../../actions/boardAction";
import { UserReissue } from "../../api/AuthAPI";
import { getCookie, setCookie } from "../../utils/cookies";

export default function BoardList() {

    const selectList = ["전체", "어학","취업", "고시", "프로그래밍", "기타"]
    const [category, setCategory] = useState("전체");
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    useEffect(()=> {
       dispatch(getBoards()); //컴포넌트 마운트 시 게시글 목록을 가져옴
    }, [dispatch]);

    const handleOption = (e) => {
        setCategory(e.target.value);
    }
    const nav = useNavigate();
    // redux state 호출
    //const boardData = useSelector(state => state.boards);
    const boardData = useSelector(state => state.board.boards); // 서버 게시글 리스트 가져오기
    const loading = useSelector(state => state.board.loading); // 로딩 상태 가져오기
 
    const [searchData, setSearchData] = useState([]);

    const searchClick = () => {
        const searchFiltered = boardData.filter(item => 
            item.title.toLowerCase().includes(search.toLowerCase())    
        );
        setSearchData(searchFiltered);
    }

    const filteredData = category === "전체" ? (searchData.length > 0 ?
        searchData : boardData) :
         (searchData.length > 0 ? searchData.filter(item => item.category === category) :
             boardData.filter(item => item.category === category));

    const searchChange = (e) => {
        setSearch(e.target.value);
    }   
    // const reissue = () => {
    //     try{
    //       const response = UserReissue();
    //       console.log(response);
    //     } catch(error) {
    //       console.log("직접 재발급 실패", error);
    //     }
    //   }


  return (
    <div className="tableContainer">
        <div className="searchFilter">
            <select className="studyCategory" name="category" onChange={handleOption} >
                {selectList.map((item) => (
                    <option value={item} key={item}>{item}</option>
                ))}
            </select>
            <input className="searchBar" type="text" placeholder="제목으로 검색" value={search} onChange={searchChange}/>
            <RecruitBtn text="검색하기" onClick={searchClick}/>
            <RecruitBtn text="스터디 모집하기" onClick={()=>nav("/newBoard")}/>
            {/*<button onClick={reissue}>재발급</button>*/}
        </div>

        <div className="tableWrapper">
            <div className="tableTop"/>
            <div className="HeaderRow">
                <div className="columnHeaderBasic">종류</div>
                <div className="columnHeaderBasic">작성자</div>
                <div className="columnHeaderTitle">스터디명</div>
                <div className="columnHeaderBasic">장소</div>
                <div className="columnHeaderBasic">상태</div>
                <div className="columnHeaderBasic">작성일</div>
            </div>
            {loading ? (
                <p>로딩중입니다...</p>
            ) : (filteredData.map((item)=><BoardItem key={item.id} {...item} />))}
            

        </div>
    </div>

  );
}
import { useNavigate, useParams } from "react-router-dom";
import BoardBtn from "../../components/BoardBtn/BoardBtn";
import Comments from "../../components/Comments/Comments";
import { Navbar } from "../../components/Navbar/Navbar";
import Viewer from "../../components/Viewer/Viewer";
import "./style.css";
import useBoard from "../../hooks/useBoard";
import { deleteBoard } from "../../actions/boardList";
import { useDispatch } from "react-redux";
import { useState } from "react";
import RecruitModal from "../../components/RecruitModal/RecruitModal";

const ViewBoardPage = () => {

    const params = useParams();
    const nav = useNavigate();
    const curBoardItem = useBoard(params.id);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    
    const showModal = () => {
        setModalOpen(true);
    }


    if(!curBoardItem){
        return <div>데이터 로딩중...</div>
    }

    const onClickDelete = () => {
        if (
            window.confirm("게시물을 정말 삭제할까요? 복구되지 않습니다!")
        ){
            dispatch(deleteBoard(params.id));
            nav('/', {replace: true});
        }
    }

    return(
        <div>
            <Navbar />
            <div className="detailWrapper">
                <div className="detailTitle">
                    {curBoardItem.title}
                </div>

                <div>
                    <Viewer
                        leader = {curBoardItem.writer}
                        created_at = {curBoardItem.created_at}
                        place = {curBoardItem.place}
                        description = {curBoardItem.description}
                    />
                </div>
                {/* 작성자만 바꿀수 있음 <아래 이름은 로그인으로 받아온 유저 정보로 바꿀예정>*/}
                {curBoardItem.writer==="노성균" ? 
                    <div className="writeBtn">
                        <BoardBtn title="모집중" /> 
                        <BoardBtn title="신청자 리스트" onClick={showModal}/>
                        <BoardBtn title="수정하기" onClick={()=>nav(`/editBoard/${params.id}`)}/>
                        <BoardBtn title="삭제하기" onClick={onClickDelete}/>
                        {modalOpen && <RecruitModal setModalOpen={setModalOpen}/>}
                    </div> 
                    :
                    <div className="readBtn">
                        <BoardBtn title="신청하기"/> {/* 신청하기 버튼은 열람자에게만 보임 */}
                    </div>                             
                }


                <div className="comments">
                    <Comments boardId={params.id}/>
                </div>
            </div>
        </div>
    )
}

export default ViewBoardPage;
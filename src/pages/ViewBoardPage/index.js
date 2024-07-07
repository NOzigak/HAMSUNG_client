import { useNavigate, useParams } from "react-router-dom";
import BoardBtn from "../../components/BoardBtn/BoardBtn";
import Comments from "../../components/Comments/Comments";
import { Navbar } from "../../components/Navbar/Navbar";
import Viewer from "../../components/Viewer/Viewer";
import "./style.css";
import useBoard from "../../hooks/useBoard";
import { deleteBoard } from "../../actions/boardList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RecruitModal from "../../components/RecruitModal/RecruitModal";
import { deleteBoardRequest, getTargetBoard, toggleRecruitmentStatus } from "../../api/BoardAPI";


const ViewBoardPage = () => {

    const params = useParams();
    const nav = useNavigate();
    const curBoardItem = useBoard(params.id);
    //const [curBoardItem, setCurBoardItem] = useState(null);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    }
    const [recruitStatus, setRecruitStatus] = useState("모집중");

    // 마운트될 때 게시글 상세 정보 요청 api 호출
    // useEffect(()=> {
    //     const fetchBoardItem = async () => {
    //         try{
    //             const data = await getTargetBoard(params.id);
    //             setCurBoardItem(data); //가져온 데이터로 상태 업데이트
    //         } catch (error) {
    //             console.log("게시글 상세 정보 불러오기 실패", error);
    //         }
    //     }
    //     fetchBoardItem();

    // }, [params.id]);


    if(!curBoardItem){
        return <div>데이터 로딩중...</div>
    }


    const onClickDelete = () => {
        if (
            window.confirm("게시물을 정말 삭제할까요? 복구되지 않습니다!")
        ){
            dispatch(deleteBoard(params.id));
            nav('/', {replace: true});
            // 삭제 api 요청
            // try {
            //     dispatch(deleteBoardRequest(params.id));
            //     nav('/', {replace: true});
            // } catch (error) {
            //     console.log("게시글을 삭제하는데 실패했습니다.", error);
            // }
        }
    }

    const changeStatus =  async () => {
        try {
            const response = await toggleRecruitmentStatus(params.id);
            console.log("모집 전환 완료", response)
            if (recruitStatus === "모집중"){
                setRecruitStatus("모집완료");
            } else if(recruitStatus === "모집완료") {
                setRecruitStatus("모집중");
            }
        } catch (error) {
            console.log("모집전환 실패", error);
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
                        <BoardBtn title={recruitStatus} onClick={changeStatus}/> 
                        <BoardBtn title="신청자 리스트" onClick={showModal}/>
                        <BoardBtn title="수정하기" onClick={()=>nav(`/editBoard/${params.id}`)}/>
                        <BoardBtn title="삭제하기" onClick={onClickDelete}/>
                        {modalOpen && <RecruitModal setModalOpen={setModalOpen} boardId={params.id}/>}
                    </div> 
                    :
                    <div className="readBtn">
                        {recruitStatus === "모집중" ? <BoardBtn title="신청하기"/> : ""}
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
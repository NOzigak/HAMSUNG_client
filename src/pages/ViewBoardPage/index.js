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
import { applyForStudy, getTargetBoard, getUserReview, toggleRecruitmentStatus } from "../../api/BoardAPI";
import getUserInfo from "../../utils/get-userInfo";
import useTargetBoard from "../../hooks/useTargetBoard";
import { deleteBoardAPI } from "../../actions/boardAction";


const ViewBoardPage = () => {

    const params = useParams();
    const nav = useNavigate();
    //const curBoardItem = useBoard(params.id);

    const [curBoardItem, setCurBoardItem] = useState(null);
    const user = getUserInfo();
    const [review, setReview] = useState(null);
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const showModal = () => {
        setModalOpen(true);
    }
    const [recruitStatus, setRecruitStatus] = useState(""); // api 연동 시 ""로 바꾸기
    

    // 마운트될 때 게시글 상세 정보 요청 api 호출
    useEffect(()=> {
        const fetchBoardItem = async () => {
            try{
                const data = await getTargetBoard(params.id);
                console.log("상세정보 가져오기 성공", data);
                setCurBoardItem(data); //가져온 데이터로 상태 업데이트
                setRecruitStatus(data.isRecruit ? "모집완료" : "모집중");
            } catch (error) {
                console.log("게시글 상세 정보 불러오기 실패", error);
                console.log(params.id);
            }
        }
        fetchBoardItem();

    }, [params.id]);
    useEffect(()=> {
        const fetchReview = async () => {
            try {
                const reviewData = await getUserReview(user.user_id);
                console.log("리뷰를 가져왔습니다", reviewData)
                setReview(reviewData);
            } catch (error) {
                console.log("리뷰를 가져오는데 실패했습니다.");
            }
        }
        fetchReview();

    }, [user.user_id]);

    if(!curBoardItem){
        return <div>데이터 로딩중...</div>
    }


    const onClickDelete = () => {
        if (
            window.confirm("게시물을 정말 삭제할까요? 복구되지 않습니다!")
        ){
            // dispatch(deleteBoard(params.id));
            // nav('/', {replace: true});
            //삭제 api 요청
            try {
                dispatch(deleteBoardAPI(params.id));
                nav('/', {replace: true});
            } catch (error) {
                console.log("게시글을 삭제하는데 실패했습니다.", error);
            }
        }
    }

    const changeStatus =  async () => {
        try {
            const response = await toggleRecruitmentStatus(params.id); // {isRecruit: curBoarditem.isRecruit}도 넣어주기
            console.log("모집 전환 완료", response)
            setRecruitStatus(state => state === "모집중" ? "모집완료" : "모집중");
        } catch (error) {
            console.log("모집전환 실패", error);
        }
    }

    const applyStudy = async () => {
        const userInfo = {
            study_id: params.id,
            user: {
                user_id: user.user_id,
                username: user.username,
            },
            review: review,
        }
        try {
            const response = await applyForStudy(params.id, userInfo);
            console.log("신청성공", response);
        } catch (error) {
            console.log("신청실패", error);
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
                        username = {curBoardItem.username}
                        created_at = {curBoardItem.createdAt}
                        place = {curBoardItem.place}
                        description = {curBoardItem.description}
                    />
                </div>
                {/* 모집글 리더 정보와 사용자 이름과 일치 시 권한*/}
                {curBoardItem.user_id=== user.user_id ? 
                    <div className="writeBtn">
                        <BoardBtn title={recruitStatus} onClick={changeStatus}/> 
                        <BoardBtn title="신청자 리스트" onClick={showModal}/>
                        <BoardBtn title="수정하기" onClick={()=>nav(`/editBoard/${params.id}`)}/>
                        <BoardBtn title="삭제하기" onClick={onClickDelete}/>
                        {modalOpen && <RecruitModal setModalOpen={setModalOpen} boardId={params.id}/>}
                    </div> 
                    :
                    <div className="readBtn">
                        {recruitStatus === "모집중" ? <BoardBtn title="신청하기" onClick={applyStudy}/> : ""}
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
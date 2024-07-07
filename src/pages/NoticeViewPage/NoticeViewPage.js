import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticeBtn from "../../components/BoardBtn/BoardBtn";
import { Navbar } from "../../components/Navbar/Navbar";
import Viewer from "../../components/Viewer/Viewer";
import "../../pages/NoticeViewPage/NoticeViewPage.css";
import { useDispatch } from "react-redux";
import { deleteNotice } from "../../actions/noticeList";


const mockNotice = {
    1: {
        id: 1,
        title: "<필독> 함성 면접 스터디 기본 규칙 설명",
        writer: "노성균",
        created_at: "2023-06-22",
        description: "함성 면접 스터디 기본 규칙을 공유합니다.\n앞으로 스터디 진행하는 동안 지켜주시기 바랍니다!"
    }
};

const NoticeViewPage = () => {
    const params = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();

    // ID를 기본적으로 1로 설정하고, URL 파라미터에 따라 ID 변경
    const noticeId = params.id || 1;
    const NoticeItem = mockNotice[noticeId];

    if (!NoticeItem) {
        return <div>데이터 로딩중...</div>;
    }

    const onClickDelete = () => {
        if (window.confirm("게시물을 정말 삭제할까요? 복구되지 않습니다!")) {
            dispatch(deleteNotice(noticeId));
            nav('/home', { replace: true });
        }
    };

    return (
        <div>
            <Navbar />
            <div className="detailWrapper">
                <div className="detailTitle">
                    {NoticeItem.title}
                </div>

                <div>
                    <Viewer
                        leader={NoticeItem.writer}
                        created_at={NoticeItem.created_at}
                        description={NoticeItem.description}
                    />
                </div>
                {NoticeItem.writer === "노성균" ? 
                    <div className="writeBtn">
                        <NoticeBtn title="수정하기" onClick={() => nav(`/editNotice/${noticeId}`)} />
                        <NoticeBtn title="삭제하기" onClick={onClickDelete} />
                    </div> 
                    : null                            
                }
            </div>
        </div>
    );
};

export default NoticeViewPage;


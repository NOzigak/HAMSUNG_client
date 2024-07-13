import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoticeBtn from "../../components/BoardBtn/BoardBtn";
import { Navbar } from "../../components/Navbar/Navbar";
import Viewer from "../../components/Viewer/Viewer";
import "../../pages/NoticeViewPage/NoticeViewPage.css";
import { useDispatch } from "react-redux";
import { deleteNotice } from "../../actions/noticeList";
import { getTargetNotice, deleteNoticeAPI } from "../../api/NoticeAPI";

const NoticeViewPage = () => {
    const params = useParams();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [noticeItem, setNoticeItem] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const data = await getTargetNotice(params.id);
                setNoticeItem(data);
            } catch (error) {
                console.error("공지사항을 불러오는 중 오류 발생:", error);
            }
        };

        fetchNotice();
    }, [params.id]);

    if (!noticeItem) {
        return <div>데이터 로딩 중...</div>;
    }

    const onClickDelete = async () => {
        if (window.confirm("게시물을 정말 삭제할까요? 복구되지 않습니다!")) {
            try {
                await deleteNoticeAPI(params.id);
                dispatch(deleteNotice(params.id));
                nav('/noticeList', { replace: true });
            } catch (error) {
                console.error("공지사항 삭제 중 오류 발생:", error);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="detailWrapper">
                <div className="detailTitle">
                    {noticeItem.title}
                </div>

                <div>
                    <Viewer
                        leader={noticeItem.writer}
                        created_at={noticeItem.created_at}
                        description={noticeItem.description}
                        place={noticeItem.place}
                    />
                </div>
                {noticeItem.writer === "노성균" ? 
                    <div className="writeBtn">
                        <NoticeBtn title="삭제하기" onClick={onClickDelete} />
                    </div> 
                    : null                            
                }
            </div>
        </div>
    );
};

export default NoticeViewPage;

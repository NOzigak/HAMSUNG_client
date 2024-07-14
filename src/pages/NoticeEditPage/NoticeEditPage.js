import React from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from '../../components/Navbar/Navbar';
import NoticeEdit from '../../components/NoticeEdit/NoticeEdit'; 
import { createNotice } from '../../actions/noticeAction';
import { useNavigate, useLocation } from 'react-router-dom';

const NoticeEditPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const study_id = location.state?.study_id;
    const dispatch = useDispatch();

    const onClickNoticeSubmitBtn = (input) => {
        console.log("스터디 아이디:",study_id);
        if (study_id) {
            dispatch(createNotice(input, study_id));
            navigate("/noticeList", { state: { study_id }, replace: true });
        } else { 
            console.error("study_id가 없습니다.");
        }
    };

    return (
        <div>
            <Navbar />
            <NoticeEdit name="작성" onSubmit={onClickNoticeSubmitBtn} />
        </div>
    );
};

export default NoticeEditPage;

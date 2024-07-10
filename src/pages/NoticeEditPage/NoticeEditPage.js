import React from 'react';
import { useDispatch } from 'react-redux';
import { Navbar } from '../../components/Navbar/Navbar';
import NoticeEdit from '../../components/NoticeEdit/NoticeEdit'; 
import { createNotice } from '../../actions/noticeList';
import { useNavigate } from 'react-router-dom';
import { createNoticeAPI } from '../../api/NoticeAPI';

const NoticeEditPage = ({ studyId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickNoticeSubmitBtn = (input) => {
        dispatch(createNotice(input, studyId));
        navigate("/noticeList", { state: { studyId }, replace: true });
    };

    return (
        <div>
            <Navbar />
            <NoticeEdit name="작성" onSubmit={onClickNoticeSubmitBtn} />
        </div>
    );
};

export default NoticeEditPage;

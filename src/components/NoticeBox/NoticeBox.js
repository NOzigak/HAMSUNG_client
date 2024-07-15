import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoticeBox.css';
import plus from "../../assets/plus.png";
import { getNoticeListAPI } from '../../api/NoticeAPI';


 
const NoticeBox = ({ study_id }) => {
  const nav = useNavigate();

  const handleMoreButtonClick = async () => {
    try {
        const allNotices = await getNoticeListAPI(study_id); 
        nav("/noticeList", { state: { notices: allNotices, study_id } });
    } catch (error) {
        console.error("공지사항을 가져오는 데 실패했습니다.", error);
        // 공지사항이 없는 경우에도 noticeList 페이지로 이동
        nav("/noticeList", { state: { notices: [] } });
    }
};

  return (
    <div className="noticeBox">
      <p className="notice">공지사항</p>
      <button className="more-button" onClick={handleMoreButtonClick}>
        <img className="plus" src={plus} alt="plus" />
      </button>
    </div>
  );
};

export default NoticeBox;

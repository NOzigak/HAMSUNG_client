import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoticeBox.css';
import plus from "../../assets/plus.png";
import { getNoticeListAPI } from '../../api/NoticeAPI';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.').replace(/\s/g, '');
};
 
const NoticeBox = ({ study_id, notices }) => {
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
      {notices.map((item) => (
        <div key={item.id} className="noticeItem" onClick={() => nav(`/notice/${item.id}`)}>
          <div className="noticeContent">
            <p className="notice-title">{item.title}</p>
            <p className="notice-date">{formatDate(item.created_at)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoticeBox;

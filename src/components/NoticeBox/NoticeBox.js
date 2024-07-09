import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoticeBox.css';
import plus from "../../assets/plus.png";

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.').replace(/\s/g, '');
  };

const NoticeBox = ({ notices }) => {
  const nav = useNavigate();

  return (
    <div className="noticeBox">
      <p className="notice">공지사항</p>
      <button className="more-button" onClick={() => nav("/noticeList")}>
        <img className="plus" src={plus} alt="plus" />
      </button>
      {notices.map((item) => (
        <div key={item.id} className="noticeItem" onClick={() => nav(`/notice`)}>
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

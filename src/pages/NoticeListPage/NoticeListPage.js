import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import './NoticeListPage.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.').replace(/\s/g, '');
};

const NoticeListPage = () => {
  const location = useLocation();
  const notices = location.state?.notices || [];
  const nav = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="title-container">
        <p className="title">면접 스터디</p>
      </div>
      <div className="outline"></div>

      <div className="noticeList">
        <p className="notice">공지사항</p>
        {notices.map((item) => (
          <div key={item.id} className="noticeItem" onClick={() => nav(`/notice/${item.id}`)}>
            <div className="noticeContent">
              <p className="notice-title">{item.title}</p>
              <p className="notice-date">{formatDate(item.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="finish-button" onClick={() => nav("/newNotice")}>새 글 작성</button>
    </div>
  );
};

export default NoticeListPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../components/Navbar/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { getNotices } from '../../actions/noticeAction';
import './NoticeListPage.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.').replace(/\s/g, '');
};

const NoticeListPage = () => {
  const location = useLocation();
  const study_id = location.state?.study_id; // location state에서 study_id 가져오기

  const dispatch = useDispatch();
  const nav = useNavigate();
  const noticeData = useSelector(state => state.notices.notices);
  const loading = useSelector(state => state.notices.loading);
  const error = useSelector(state => state.notices.error);



  // navigation 상태 변화 감지 및 공지사항 재불러오기
  useEffect(() => {
    console.log("지금 id:", study_id);
    if (study_id) {
      dispatch(getNotices(study_id));
    }
  }, [location, dispatch, study_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="title-container">
        <p className="title">공지사항 리스트</p>
      </div>
      <div className="outline"></div>

      <div className="noticeList">
        {Array.isArray(noticeData) && noticeData.map((item) => (
          <div 
            key={item.id} 
            className="noticeItem" 
            onClick={() => nav(`/notice/${item.id}`)}
          >
            <div className="noticeContent">
              <p className="notice-title">{item.title}</p>
              <p className="notice-date">{formatDate(item.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="finish-button" 
        onClick={() => {
          console.log("notice edit으로 전달:", study_id);
          nav("/newNotice", { state: { study_id } });
        }}
      > 
        새 글 작성
      </button>
    </div>
  );
};

export default NoticeListPage;

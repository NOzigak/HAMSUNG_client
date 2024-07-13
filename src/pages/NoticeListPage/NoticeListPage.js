import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../../components/Navbar/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { getNotices } from '../../actions/noticeAction';
import './NoticeListPage.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.').replace(/\s/g, '');
};

const NoticeListPage = () => {
  const { studyId } = useParams();  // URL에서 studyId 가져오기
  const dispatch = useDispatch();
  const nav = useNavigate();
  const notices = useSelector(state => state.noticeList.notices); // Redux 상태에서 공지사항 목록 가져오기

  useEffect(() => {
    dispatch(getNotices(studyId)); // GET_NOTICE_REQUEST 액션을 dispatch
  }, [dispatch, studyId]);

  return (
    <div>
      <Navbar />
      <div className="title-container">
        <p className="title">공지사항 리스트</p>
      </div>
      <div className="outline"></div>

      <div className="noticeList">
        {notices.map((item) => (
          <div key={item.id} className="noticeItem">
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

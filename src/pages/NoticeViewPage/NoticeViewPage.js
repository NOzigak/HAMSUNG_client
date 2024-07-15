import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import BoardBtn from '../../components/BoardBtn/BoardBtn';
import { Navbar } from '../../components/Navbar/Navbar';
import Viewer from '../../components/Viewer/Viewer';
import '../NoticeViewPage/NoticeViewPage.css';
import { deleteNotice } from '../../actions/noticeAction';
import { getTargetNotice } from '../../api/NoticeAPI';

const NoticeViewPage = () => {
  const params = useParams();
  const nav = useNavigate();

  const [noticeItem, setNoticeItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNoticeItem = async () => {
      try {
        const data = await getTargetNotice(params.id);
        console.log("공지정보 가져오기 성공", data);
        setNoticeItem(data);
      } catch (error) {
        console.log("게시글 상세 정보 불러오기 실패", error);
        console.log(params.id);
      }
    };
    fetchNoticeItem();
  }, [params.id]);

  if (!noticeItem) {
    return <div>데이터 로딩중...</div>;
  }

  const onClickDelete = () => {
    if (window.confirm("게시물을 정말 삭제할까요? 복구되지 않습니다!")) {
      try {
        dispatch(deleteNotice(params.id));
        nav('/noticeList');
      } catch (error) {
        console.log("게시글을 삭제하는데 실패했습니다.", error);
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
            leader={noticeItem.username}
            created_at={noticeItem.created_at}
            description={noticeItem.description}
            place={noticeItem.place}
            mode={"notice"}
          />
        </div>

        <div className="writeBtn">
          <BoardBtn title="삭제하기" onClick={onClickDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoticeViewPage;

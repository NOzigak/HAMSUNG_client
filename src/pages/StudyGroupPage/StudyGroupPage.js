import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './StudyGroupPage.css';
import FinishStudyModal from "../../components/FinishStudyModal/FinishStudyModal";
import WeeklyStudyModal from "../../components/WeeklyStudyModal/WeeklyStudyModal";
import NoticeBox from "../../components/NoticeBox/NoticeBox";
import StudyCalendar from "../../components/StudyCalendar/StudyCalendar";
import TodoBoard from "../../components/TodoBoard/TodoBoard";
import { Navbar } from "../../components/Navbar/Navbar";
import studyPoint from "../../assets/studyPoint.png";
import { finishStudyAPI } from "../../api/StudyGroupAPI";

const StudyGroupPage = () => {
  const location = useLocation();
  const studyInfo = location.state?.studyInfo || {};
  const [showFinishStudyModal, setShowFinishStudyModal] = useState(false);
  const [showWeeklyStudyModal, setShowWeeklyStudyModal] = useState(false);
  const [value, setValue] = useState(new Date());
  const [weekCount, setWeekCount] = useState(2);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null);

  const handleFinishClick = async () => {
    try {
      const result = await finishStudyAPI(studyInfo.id);
      if (result.status === 200) {
        setShowFinishStudyModal(true);
        console.log("스터디 종료 성공");
      } else {
        console.log("스터디 종료 실패");
      }
    } catch (error) {
      console.error("Error finishing study:", error);
    }
  };

  const handleCloseFinishStudyModal = () => {
    setShowFinishStudyModal(false);
  };

  const handleCalendarChange = (newValue) => {
    setValue(newValue);
  };

  const addStudy = () => {
    setWeekCount(weekCount + 1);
  };

  const handleWeeklyClick = (index) => {
    setSelectedWeekIndex(index);
    setShowWeeklyStudyModal(true);
  };

  const handleOkWeeklyStudyModal = () => {
    setShowWeeklyStudyModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="title-container">
        <p className="title">{studyInfo.study_name || "스터디"}</p>
        <img className="studyPoint" src={studyPoint} alt="StudyPoint" />
        <p className="studyPoint-text">{studyInfo.score || 0} P</p>
      </div>
      <button className="finish-button" onClick={handleFinishClick}>스터디 종료</button>
      <div className="outline"></div>

      <div className="boardList">
        <NoticeBox />
      </div>

      <div>
        <StudyCalendar onChange={handleCalendarChange} /> {/* onChange props 전달 */}
      </div>

      <div>
        <TodoBoard value={value} /> {/* value props 전달 */}
      </div>

      <div className="weekly-container">
        <p className="weekly-container-title">스터디 관리</p>
        {[...Array(weekCount)].map((_, index) => (
          <div key={index}>
            <button className="weekly-study" onClick={() => handleWeeklyClick(index)}>
              {`${index + 1}주차 스터디`}
            </button>
          </div>
        ))}

        <div>
          <button className="addStudy" onClick={addStudy}>➕</button>
        </div>
      </div>

      {showFinishStudyModal && (
        <FinishStudyModal
          onClose={handleCloseFinishStudyModal}
        />
      )}

      {showWeeklyStudyModal && (
        <WeeklyStudyModal
          onClose={handleOkWeeklyStudyModal}
          weekIndex={selectedWeekIndex}
        />
      )}

      {studyInfo && (
        <div className="study-info">
          <p>ID: {studyInfo.id}</p>
          <p>Category: {studyInfo.category}</p>
          <p>Place: {studyInfo.place}</p>
          <p>Member Number: {studyInfo.member_num}</p>
          <p>Status: {studyInfo.status}</p>
          <p>Start Date: {studyInfo.startDate}</p>
          <p>End Date: {studyInfo.endDate}</p>
          <p>Score: {studyInfo.score}</p>
          <p>Leader ID: {studyInfo.leader_id}</p>
        </div>
      )}
    </div>
  );
};

export default StudyGroupPage;

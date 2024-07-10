import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './StudyGroupPage.css';
import FinishStudyModal from "../../components/FinishStudyModal/FinishStudyModal";
import WeeklyStudyModal from "../../components/WeeklyStudyModal/WeeklyStudyModal";
import CalculatePoint from "../../components/CalculatePoint/CalculatePoint";
import NoticeBox from "../../components/NoticeBox/NoticeBox";
import StudyCalendar from "../../components/StudyCalendar/StudyCalendar";
import TodoBoard from "../../components/TodoBoard/TodoBoard";
import { Navbar } from "../../components/Navbar/Navbar";
import studyPoint from "../../assets/studyPoint.png";
import { finishStudyAPI, saveWeeklyStudyData } from "../../api/StudyGroupAPI";
import { useSelector } from 'react-redux'; // 공지사항 데이터 가져옴
import { getLatestNotices } from '../../utils/getLatestNotices';

const StudyGroupPage = () => {
    const location = useLocation();
    const studyInfo = location.state?.studyInfo || {}; 
    const [showFinishStudyModal, setShowFinishStudyModal] = useState(false);
    const [showWeeklyStudyModal, setShowWeeklyStudyModal] = useState(false);
    const [showCalculatePoint, setShowCalculatePoint] = useState(false);
    const [value, setValue] = useState(new Date());
    const [weekCount, setWeekCount] = useState(2);
    const [selectedWeekIndex, setSelectedWeekIndex] = useState(null);
    const [weekScore, setWeekScore] = useState(null); // 주차 점수 state 추가

    const NoticeData = useSelector(state => state.notice); // 공지사항 데이터 가져오기
    const latestNotices = getLatestNotices(NoticeData, 2); // 최신 공지 2개 추출

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
            console.error("스터디 종료 중 에러:", error);
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

    const handleSaveWeeklyStudyModal = (weekScore) => {
        setWeekScore(weekScore); // week_score를 state에 저장
        setShowCalculatePoint(true); // CalculatePoint 모달 표시
    };

    const handleCloseWeeklyStudyModal = () => {
        setShowWeeklyStudyModal(false);
    };

    const handleCloseCalculatePoint = () => {
        setShowCalculatePoint(false);
    };

    return (
        <div>
            <Navbar />
            <div className="title-container">
                <p className="title">{studyInfo.title || "페이지"}</p>
                <img className="studyPoint" src={studyPoint} alt="StudyPoint" />
                <p className="studyPoint-text">{studyInfo.score || "P"}</p>
            </div>
            <button className="finish-button" onClick={handleFinishClick}>스터디 종료</button>
            <div className="outline"></div>

            <div className="boardList">
                <NoticeBox notices={latestNotices} />
            </div>

            <div>
                <StudyCalendar onChange={handleCalendarChange} />
            </div>

            <div>
                <TodoBoard value={value} />
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
                    onClose={handleCloseWeeklyStudyModal}
                    weekIndex={selectedWeekIndex}
                    handleCalculate={handleSaveWeeklyStudyModal} 
                />
            )}

            {showCalculatePoint && (
                <CalculatePoint
                    show={showCalculatePoint}
                    onClose={handleCloseCalculatePoint}
                    weekScore={weekScore}
                />
            )}

        </div>
    );
};

export default StudyGroupPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './StudyGroupPage.css';
import FinishStudyModal from "../../components/FinishStudyModal/FinishStudyModal";
import WeeklyStudyModal from "../../components/WeeklyStudyModal/WeeklyStudyModal";
import CalculatePoint from "../../components/CalculatePoint/CalculatePoint";
import NoticeBox from "../../components/NoticeBox/NoticeBox";
import StudyCalendar from "../../components/StudyCalendar/StudyCalendar";
import TodoBoard from "../../components/TodoBoard/TodoBoard";
import { Navbar } from "../../components/Navbar/Navbar";
import studyPoint from "../../assets/studyPoint.png";
import { finishStudyAPI } from "../../api/StudyGroupAPI";
import { getLatestNotices } from '../../utils/getLatestNotices';

const StudyGroupPage = () => {
    const location = useLocation();
    const [studyInfo, setStudyInfo] = useState({});
    const [showFinishStudyModal, setShowFinishStudyModal] = useState(false);
    const [showWeeklyStudyModal, setShowWeeklyStudyModal] = useState(false);
    const [showCalculatePoint, setShowCalculatePoint] = useState(false);
    const [value, setValue] = useState(new Date());
    const [weekCount, setWeekCount] = useState(2);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [weekScore, setWeekScore] = useState(null);
    const [showButtons, setShowButtons] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const NoticeData = useSelector(state => state.notice);
    const latestNotices = getLatestNotices(NoticeData, 2);
    const nav = useNavigate();

    useEffect(() => {
        if (location.state?.studyInfo) {
            setStudyInfo(location.state.studyInfo);
        }
    }, [location.state]);

    const handleFinishClick = async () => {
        try {
            const result = await finishStudyAPI(studyInfo.id);
            if (result.status === 200) {
                setShowFinishStudyModal(true);
            } else {
                console.log("스터디 종료 실패");
            }
        } catch (error) {
            console.error("스터디 종료 중 에러:", error);
        }
    };

    const handleCloseFinishStudyModal = () => {
        setShowFinishStudyModal(false);
        nav("/mypage");
    };

    const handleCalendarChange = (newValue) => {
        setValue(newValue);
    };

    const addStudy = () => {
        setWeekCount(weekCount + 1);
    };

    const handleWeeklyClick = (index) => {
        setSelectedWeek(index);
        setShowWeeklyStudyModal(true);
        setShowButtons(true);
    };

    const handleSaveWeeklyStudyModal = (weekScore) => {
        setWeekScore(weekScore);
        setShowCalculatePoint(true);
        setShowButtons(false); 
    };

    const handleCloseWeeklyStudyModal = () => {
        setShowWeeklyStudyModal(false);
    };

    const handleCloseCalculatePoint = () => {
        setShowCalculatePoint(false);
    };

    const handleReviewClick = () => {
        setShowReviewModal(true);
    };

    const handleCloseReviewModal = () => {
        setShowReviewModal(false);
    };

    return (
        <div>
            <Navbar />
            <div className="title-container">
                <p className="title">{studyInfo.title} 페이지</p>
                <img className="studyPoint" src={studyPoint} alt="StudyPoint" />
                <p className="studyPoint-text">{studyInfo.score}P</p>
            </div>
            <button className="finish-button" onClick={handleFinishClick}>스터디 종료</button>
            <div className="outline"></div>

            <div className="boardList">
                <NoticeBox 
                    notices={latestNotices}
                    study_id={studyInfo.id} 
                /> 
            </div>

            <div>
                <StudyCalendar value={value} onChange={handleCalendarChange} />
            </div>

            <div>
                <TodoBoard 
                    currentDate={value}
                    study_id={studyInfo.id}
                /> 
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
                    week={selectedWeek}
                    study_id={studyInfo.id}
                    handleCalculate={handleSaveWeeklyStudyModal}
                    showButtons={showButtons}
                    setShowButtons={setShowButtons}
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

import React, { useState, useEffect } from "react";
import "./WeeklyStudyModal.css";
import { saveWeeklyStudyData, getWeeklyStudyData } from "../../api/StudyGroupAPI";

const WeeklyStudyModal = ({ onClose, week, study_id, handleCalculate, showButtons, setShowButtons }) => {
  const [attendance, setAttendance] = useState("");
  const [late, setLate] = useState("");
  const [absent, setAbsent] = useState("");
  const [homework, setHomework] = useState("");

  useEffect(() => {
    const loadWeeklyData = async () => {
      try {
        const data = await getWeeklyStudyData(study_id, week + 1);
        setAttendance(data.attendance);
        setLate(data.late);
        setAbsent(data.absent);
        setHomework(data.homework);
      } catch (error) {
        console.error("Error getting weekly study data:", error);
      }
    };

    loadWeeklyData();
  }, [week, study_id]);

  const handleSaveWeekly = async () => {
    try {
      const response = await saveWeeklyStudyData(study_id, week + 1, attendance, late, absent, homework);
      handleCalculate(response.week_score);
      onClose();
      setShowButtons(false); // 저장 후 버튼 숨기기
    } catch (error) {
      alert("이미 저장된 스터디 정보입니다!"); 
    }
  };


  return (
    <div className="weekly-modal">
      <div className="weeklyWrapper">
      <p className="weeklyTitle">{`${week + 1}주차 스터디 관리`}</p>
      <div className="weeklyContent">
        <div className={`weeklyInputList ${showButtons ? "" : "hide-buttons"}`}>
          출석
          <input 
            className="weeklyInput"
            type="text" 
            value={attendance} 
            onChange={(e) => setAttendance(e.target.value)} 
            placeholder={attendance}
          />
        </div>
        <div className={`weeklyInputList ${showButtons ? "" : "hide-buttons"}`}>
          지각
          <input
            className="weeklyInput"
            type="text" 
            value={late} 
            onChange={(e) => setLate(e.target.value)} 
            placeholder={late}
          />
        </div>
        <div className={`weeklyInputList ${showButtons ? "" : "hide-buttons"}`}>
          결석
          <input 
            className="weeklyInput"
            type="text" 
            value={absent} 
            onChange={(e) => setAbsent(e.target.value)} 
            placeholder={absent}
          />
        </div>
        <div className={`weeklyInputList ${showButtons ? "" : "hide-buttons"}`}>
          과제
          <input 
            className="weeklyInput"
            type="text" 
            value={homework} 
            onChange={(e) => setHomework(e.target.value)} 
            placeholder={homework}
          />
        </div>
        <button className="close-weekly-button" onClick={onClose}>✖</button>
        {showButtons && (
          <button className="weekly-ok-button" onClick={handleSaveWeekly}>저장</button>
        )}
      </div>
      </div>
      
    </div>
  );
};

export default WeeklyStudyModal;

import React, { useState, useEffect } from "react";
import "./WeeklyStudyModal.css";
import { saveWeeklyStudyData, getWeeklyStudyData } from "../../api/StudyGroupAPI";

const WeeklyStudyModal = ({ onClose, weekIndex, handleCalculate }) => {
  const [attendance, setAttendance] = useState("");
  const [late, setLate] = useState("");
  const [absent, setAbsent] = useState("");
  const [homework, setHomework] = useState("");

  useEffect(() => {
    const loadWeeklyData = async () => {
      try {
        const data = await getWeeklyStudyData(weekIndex + 1);
        setAttendance(data.attendance);
        setLate(data.late);
        setAbsent(data.absent);
        setHomework(data.homework);
      } catch (error) {
        console.error("Error geting weekly study data:", error);
      }
    };

    loadWeeklyData();
  }, [weekIndex]);

  const handleSaveWeekly = async () => {
    try {
      const response = await saveWeeklyStudyData(weekIndex + 1, attendance, late, absent, homework);
      console.log("저장 완료:", response);
      handleCalculate(response.week_score); // 데이터 저장 후 week_score 전달하여 handleCalculate 함수 호출
      onClose();
    } catch (error) {
      console.error("저장 실패:", error);
    }
  };

  return (
    <div className="weekly-modal">
      <div className="weekly-message-design">{`${weekIndex + 1}주차 스터디 관리`}</div>
      <div className="weekly-modal-content">
        <div className="weeklyInputList">
          출석
          <input 
            className="weeklyInput"
            type="text" 
            value={attendance} 
            onChange={(e) => setAttendance(e.target.value)} 
          />
        </div>
        <div className="weeklyInputList">
          지각
          <input
            className="weeklyInput"
            type="text" 
            value={late} 
            onChange={(e) => setLate(e.target.value)} 
          />
        </div>
        <div className="weeklyInputList">
          결석
          <input 
            className="weeklyInput"
            type="text" 
            value={absent} 
            onChange={(e) => setAbsent(e.target.value)} 
          />
        </div>
        <div className="weeklyInputList">
          과제
          <input 
            className="weeklyInput"
            type="text" 
            value={homework} 
            onChange={(e) => setHomework(e.target.value)} 
          />
        </div>
        <button className="close-weekly-button" onClick={onClose}>✖</button>
        <button className="weekly-ok-button" onClick={handleSaveWeekly}>저장</button>
      </div>
    </div>
  );
};

export default WeeklyStudyModal;

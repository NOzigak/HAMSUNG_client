import React from "react";
import "./FinishStudyModal.css";
import "../DeleteID/DeleteID.css";

const FinishStudyModal = ({ onClose }) => {
  return (
    <div className="finish-modal">
      <div className="finishWrapper">
      <div className="finishTitle">확인 메시지</div>
        <div className="finishContent">
          <p>스터디가 종료되었습니다. <br />수고하셨습니다!</p>
          <button className="finish-close-button" onClick={onClose}>닫기</button>
        </div>
      </div> 
      </div>
        
  );
};

export default FinishStudyModal;


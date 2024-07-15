import React from "react";
import "./CalculatePoint.css";

const CalculatePoint = ({ show, onClose, weekScore }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="cal-message-design">확인 메시지</div>
      <div className="cal-modal-content">
        <p>{weekScore} 포인트가 적립되었습니다.</p>
        <button className="cal-ok-button" onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default CalculatePoint; 
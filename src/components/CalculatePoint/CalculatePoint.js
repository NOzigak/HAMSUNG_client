import React from "react";

const CalculatePoint = ({ show, onClose, weekScore }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="message-design">확인 메시지</div>
      <div className="confirm-modal-content">
        <p>{weekScore} 포인트가 적립되었습니다.</p>
        <button className="ok-button" onClick={onClose}>확인</button>
      </div>
    </div>
  );
};

export default CalculatePoint;

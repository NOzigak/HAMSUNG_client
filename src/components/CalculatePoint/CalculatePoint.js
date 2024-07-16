import React from "react";
import "./CalculatePoint.css";

const CalculatePoint = ({ show, onClose, weekScore }) => {
  return (
    <div className={`cal-modal ${show ? "show" : ""}`}>
      <div className="calWrapper">
       <p className="calTitle">확인 메시지</p>
       <div className="calContent">
         <p>{weekScore} 포인트가 적립되었습니다.</p>
         <button className="cal-ok-button" onClick={onClose}>확인</button>
       </div>
      </div>
      
    </div>
  );
};

export default CalculatePoint; 
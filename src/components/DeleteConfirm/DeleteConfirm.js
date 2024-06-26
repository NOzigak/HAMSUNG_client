import React from "react";
import "./DeleteConfirm.css";

const DeleteConfirm = ({ show, handleClose }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`}>
    <div className="message-design">확인 메시지</div>
      <div className="confirm-modal-content">
        <p>탈퇴되었습니다.</p>
        <button className="ok-button" onClick={handleClose}>확인</button>
      </div>
    </div>
  );
};

export default DeleteConfirm;

import React, { useState } from "react";
import "./DeleteID.css";
import { DeleteUserAPI } from "../../api/MyPageAPI";

const DeleteID = ({ show, handleClose, handleConfirm, userId }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log(userId);
    const success = await DeleteUserAPI(userId);
    setIsDeleting(false);

    if (success == true) {
      handleConfirm();
      handleClose();
    } else {
      alert('회원 탈퇴에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="message-design">확인 메시지</div>
      <div className="modal-content">
        <p>
          회원 탈퇴 시, Hamsung에 로그인 하실 수 없으며
          보유하신 정보가 모두 삭제되어 복구할 수 없습니다. 정말 탈퇴하시겠습니까?
        </p>
        <button 
          className="confirm-button" 
          onClick={handleDelete} 
          disabled={isDeleting}
        >
          {isDeleting ? '탈퇴 중...' : '탈퇴'}
        </button>
        <button 
          className="cancel-button" 
          onClick={handleClose} 
          disabled={isDeleting}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default DeleteID;

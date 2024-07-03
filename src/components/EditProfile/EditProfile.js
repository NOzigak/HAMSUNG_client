import React from "react";
import "./EditProfile.css";
import profileImage from "../../assets/person.png";
import { nickname } from "../../pages/MyPage/MyPage";
import noLate from "../../assets/ptag.png";
import slowAnswer from "../../assets/ntag.png";
import { point } from "../../pages/MyPage/MyPage";

const EditProfile = ({ show, handleEdit }) => {
  return (
    <div className={`profile-modal ${show ? "show" : ""}`}>
      <div className="profile-modal-content">
        <p className="profile-message-design">나의 프로필</p>
        <div className="profile-image-container">
          <img className="profile-image" src={profileImage} alt="Profile" />
        </div>
        <input 
          type="text" 
          className="nickname-input" 
          placeholder={nickname} 
        />
        <p className="tag-message-design">나의 태그</p>
        <img className="pTag" src={noLate} alt="Camera" />
        <img className="nTag" src={slowAnswer} alt="Camera" />
        <p className="myPoint">현재 포인트: { point } P</p>
        <hr />
        <button className="edit-button" onClick={handleEdit}>저장</button>
      </div>
    </div>
  );
};

export default EditProfile;
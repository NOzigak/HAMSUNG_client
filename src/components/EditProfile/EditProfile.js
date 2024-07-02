import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import profileImage from "../../assets/person.png";
import tagIcon from "../../assets/applicant.png";
import { EditProfileAPI, getUserReviewsAPI } from '../../api/MyPageAPI';

const EditProfile = ({ show, handleEdit, userId, token, point, onUpdateNickname, initialNickname }) => {
  const [newNickname, setNewNickname] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getUserReviewsAPI(userId, token);
        if (result && result.status === 200) {
          setReviews(result.data.data.evaluation);
        } else {
          console.error("리뷰 조회 실패:", result.message);
        }
      } catch (error) {
        console.error("리뷰 조회 중 오류 발생:", error.message);
      }
    };

    if (show) {
      fetchReviews();
    }
  }, [show, userId, token]);

  const handleSave = async () => {
    const result = await EditProfileAPI(userId, newNickname, token);
    if (result.status === 200) {
      onUpdateNickname(newNickname);
      handleEdit();
      console.log("update success.");
    } else {
      console.error("닉네임 업데이트 실패:", result.message);
    }
  };

  const closeProfileModal = () => {
    handleEdit();
  };

  return (
    <div className={`profile-modal ${show ? "show" : ""}`}>
      <div className="profile-modal-content">
        <p className="profile-message-design">나의 프로필</p>
        <button className="close-profile-button" onClick={closeProfileModal}>✖</button>
        <div className="profile-image-container">
          <img className="profile-image" src={profileImage} alt="Profile" />
        </div>
        <input
          type="text"
          className="nickname-input"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
          placeholder={initialNickname}
        />
        <p className="tag-message-design">나의 태그</p>
        <div>
          <div className="tag-container">
            {reviews && Object.entries(reviews).map(([key, value]) => (
              <div key={key} className="tag-item">
                <span className="tag-name">{key}</span>
                <img className="tag-icon" src={tagIcon}></img>
                <span className="tag-number">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="end-container">
         <p className="myPoint">현재 포인트: {point} P</p>
         <hr />
         <button className="edit-button" onClick={handleSave}>저장</button>
        </div>
        
      </div>
    </div>
  );
};

export default EditProfile;


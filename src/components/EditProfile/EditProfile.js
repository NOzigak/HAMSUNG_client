import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import profileImage from "../../assets/person.png";
import tagIcon from "../../assets/applicant.png";
import { EditProfileAPI, fetchUserData } from '../../api/MyPageAPI';

const mapReviewType = (type) => {
    const reviewTypeMapping = {
        "noLate": "지각하지 않아요",
        "faithful": "성실하게 참여해요",
        "kind": "친절해요",
        "unkind": "불친절해요",
        "fastAnswer": "연락을 빠르게 확인해요",
        "slowAnswer": "답장이 느려요",
        "passive": "소극적으로 참여해요",
        "absent": "지각,결석,과제 미제출이 잦아요"        
    };
    return reviewTypeMapping[type] || type; // 매핑되지 않은 경우 원래 타입 반환
};

const EditProfile = ({ show, handleEdit, user_id, point, onUpdateNickname, initialNickname }) => {
  const [newNickname, setNewNickname] = useState(initialNickname);
  const [reviews, setReviews] = useState([]);

  useEffect(() => { 
    const fetchReviews = async () => {
        try {
            const result = await fetchUserData(user_id);
            console.log("현재 사용자 정보", result);

            if (result.status === 200) {
                console.log("현재 사용자 정보", result.data.reviewResponseDto);
                setReviews(result.data.reviewResponseDto);
                //console.log("전체 리뷰", reviews);
            } else {
                console.error("리뷰 조회 실패:", result.message);
            }
        } catch (error) {
            console.error("리뷰 조회 중 오류 발생:", error.message);
        }
    };

    fetchReviews();
}, [user_id]);

  const handleSave = async () => {
    try {
      console.log("내 아이디:", user_id);
      const result = await EditProfileAPI(user_id, newNickname);
      console.log(newNickname);
      console.log(result.status);
      if (result && result.status === 200) {
        if (initialNickname !== newNickname) {
          onUpdateNickname(newNickname); 
          handleEdit(); 
          console.log("닉네임 업데이트 성공.");
        } else {
          console.error("닉네임이 변경되지 않았습니다.");
        }
      } else {
        console.error("닉네임 업데이트 실패:", result.message);
      }
    } catch (error) {
      console.error("닉네임 업데이트 중 오류 발생:", error.message);
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
              <div key={key} className="whole-tag-box">
                <span className="tag-name">{mapReviewType(key)}</span> {/* 여기서 매핑 */}
                <img className="tag-icon" src={tagIcon} alt="tag icon" />
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

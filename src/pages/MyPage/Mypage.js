import React, { useState, useEffect } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from "../../components/Navbar/Navbar";
import DeleteID from "../../components/DeleteID/DeleteID";
import DeleteConfirm from "../../components/DeleteConfirm/DeleteConfirm";
import EditProfile from "../../components/EditProfile/EditProfile";
import profileImage from '../../assets/person.png';
import lvSilver from "../../assets/silver.png";
import lvGold from "../../assets/gold.png";
import lvBronze from "../../assets/bronze.png";
import lvDia from "../../assets/Dia.png";
import lvPlatinum from "../../assets/Platinum.png";
import tagIcon from "../../assets/applicant.png";
import ReviewModal from '../../components/ReviewModal/ReviewModal';
import { findTopTwoReviews } from "../../utils/findTwoReview";
import { fetchUserData, getStudies } from '../../api/MyPageAPI';
import { getStudyInfoAPI } from '../../api/StudyGroupAPI';
import "./MyPage.css";
import getUserInfo from '../../utils/get-userInfo';

const MyPage = () => {
    const [showDeleteIDModal, setShowDeleteIDModal] = useState(false);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [username, setUsername] = useState('');
    const [point, setPoint] = useState(0);
    const [review, setReview] = useState({});
    const [topReviews, setTopReviews] = useState([]);
    const [studies, setStudies] = useState([]);
    const [selectedStudyId, setSelectedStudyId] = useState(null);
    
    const navigate = useNavigate();
    const user = getUserInfo();

    useEffect(() => {
        loadUserData();
        loadUserStudies();
    }, []);

    const loadUserData = async () => {
        try {
            const userData = await fetchUserData(user.user_id);
            const { username, point, reviewResponseDto } = userData;
            const topReviews = findTopTwoReviews(reviewResponseDto);
    
            setUsername(username);
            setPoint(point);
            if (Array.isArray(topReviews)) {
                setReview(reviewResponseDto);
                setTopReviews(topReviews);
            } else {
                console.error('리뷰 정보를 불러오는 중 오류 발생:', topReviews);
            }
        } catch (error) {
            console.error('접속에 실패했습니다.', error);
        }
    };

    const loadUserStudies = async () => {
            try {
              const studies = await getStudies(user.user_id);
              setStudies(studies);

          } catch (error) {
              console.error('스터디 정보를 불러오는 중 오류 발생:', error);
          }
        };


    const handleDeleteClick = () => {
        setShowDeleteIDModal(true);
    };

    const handleCloseDeleteIDModal = () => {
        setShowDeleteIDModal(false);
    };

    const handleConfirmDelete = () => {
        setShowDeleteIDModal(false);
        setShowDeleteConfirmModal(true);
    };

    const handleCloseDeleteConfirmModal = () => {
        setShowDeleteConfirmModal(false);
    };

    const handleEditClick = () => {
        setShowEditProfileModal(true);
    };

    const handleCloseEditProfileModal = () => {
        setShowEditProfileModal(false);
    };

    const handleUpdateNickname = (newNickname) => {
        setUsername(newNickname);
    };

    const handleEvaluateClick = () => {
        setShowReviewModal(true);
    };

    const handleCloseReviewModal = () => {
        setShowReviewModal(false);
    };

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleStudyClick = async (study_id) => {
        try {
            const response = await getStudyInfoAPI(study_id);
            const studyInfo = {
                id: response.data.study_id,
                member_num: response.data.member_num,
                score: response.data.score,
                leader_id: response.data.leader_id,
                title: response.data.title,
            }
            console.log(studyInfo);
            console.log(studyInfo.score);
            //setSelectedStudyId(study_id);
            navigate('/studyGroup', { state: { studyInfo } });
        } catch (error) {
            console.error('스터디 정보를 불러오는 중 오류 발생:', error);
        }
    };

    let levelImage;
    if (point < 20) {
        levelImage = lvBronze;
    } else if (point >= 20 && point < 40) {
        levelImage = lvSilver;
    } else if (point >= 40 && point < 60) {
        levelImage = lvGold;
    } else if (point >= 60 && point < 80) {
        levelImage = lvDia;
    } else if (point >= 80) {
        levelImage = lvPlatinum;
    }

    return (
        <div>
            <Navbar />
            <p className="title">마이페이지</p>
            <button className="deleteID" onClick={handleDeleteClick}>회원탈퇴</button>
            <div className="outline"></div>
            <div className="circle-container">
                <img className="profile-image" src={profileImage} alt="Profile" />
            </div>
            <div className="profile">
                <p className="user-ID"> {username} 님</p>
                <div className="user-point">나의 포인트: {point} P</div>
                <div className="user-tags">
                    <p className="user-tag">나의 태그: </p>
                    {topReviews.map((review, index) => (
                        <div className="most-tag-item" key={index}>
                            <div className="tag-box">
                                <span className="tag-name">{review.review_type}</span>
                                <img className="tag-icon" src={tagIcon} alt="tag icon" />
                                <span className="tag-number">{review.count}</span>
                                <br />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="level-image">
                    <img src={levelImage} alt="Level" />
                </div>
                <button className="edit-profile-button" onClick={handleEditClick}>프로필 수정하기</button>
            </div>
            <p className="study-list">참여 중인 스터디</p>
            <div className="inline"></div>

            {showReviewModal && (
                <ReviewModal
                    closeReviewModal={handleCloseReviewModal}
                    currentPage={currentPage}
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            )}

            {studies && studies.length > 0 ? (
                studies.map((study, index) => (
                    <div className="myStudy" key={index}>
                        <p className="studyTitle">{study.study_name} ({study.my_role === 'leader' ? '그룹장' : '멤버'})</p>
                        {study.end_date === null ? (
                            <button className="studyList-button" onClick={() => handleStudyClick(study.id)}>바로가기</button>
                        ) : (
                            <button
                                className="studyList-button"
                                onClick={() => handleEvaluateClick(study.id)}
                            >
                                평가하기
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p>참여 중인 스터디가 없습니다.</p>
            )}

            <DeleteID
                show={showDeleteIDModal}
                handleClose={handleCloseDeleteIDModal}
                handleConfirm={handleConfirmDelete}
            />

            <DeleteConfirm
                show={showDeleteConfirmModal}
                handleClose={handleCloseDeleteConfirmModal}
            />

            <EditProfile
                show={showEditProfileModal}
                handleEdit={handleCloseEditProfileModal}
                user_id={user.user_id}
                point={point}
                onUpdateNickname={handleUpdateNickname}
                initialNickname={username}
            />
        </div> 
    );
};

export default MyPage;

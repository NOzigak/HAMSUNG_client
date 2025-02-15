import React, { useState, useEffect } from 'react';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import { Navbar } from "../../components/Navbar/Navbar";
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
            console.log("유저 데이터1:",userData.data);
            const { username, point, reviewResponseDto } = userData.data;
            console.log("유저 데이터2:",point);

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

    const handleEditClick = () => {
        setShowEditProfileModal(true);
    };

    const handleCloseEditProfileModal = () => {
        setShowEditProfileModal(false);
    };

    const handleUpdateNickname = (newNickname) => {
        setUsername(newNickname);
    };

    const handleEvaluateClick = (study_id) => {
        setSelectedStudyId(study_id); // 선택된 스터디 ID 설정
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
            console.log("현재 스터디 id:",study_id);
            const response = await getStudyInfoAPI(study_id);
            const studyInfo = {
                id: response.data.id,
                member_num: response.data.member_num,
                score: response.data.score,
                leader_id: response.data.leader_id,
                title: response.data.title
            }
            navigate('/studyGroup', { state: { studyInfo, totalPages: response.data.member_num } });
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
                    study_id={selectedStudyId}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    totalPages={selectedStudyId ? studies.find(study => study.id === selectedStudyId)?.member_num : 1}
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

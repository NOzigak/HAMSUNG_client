import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = () => {
        const data = {
            username: "노성균",
            point: 43,
            review: {
                noLate: 5,
                faithful: 3,
                kind: 10,
                unkind: 1,
                fastAnswer: 7,
                slowAnswer: 2,
                passive: 0,
                absent: 4
            },
            studies: [
                {
                    id: 7,
                    category: '프로그래밍',
                    place: '서울',
                    member_num: 5,
                    status: true,
                    score: 150,
                    leader_id: 1,
                    start_date: '2024-05-01',
                    end_date: null,
                    my_role: 'leader',
                    study_name: '면접 스터디'
                },
                {
                    id: 8,
                    category: '프로그래밍',
                    place: '서울',
                    member_num: 5,
                    status: true,
                    score: 80,
                    leader_id: 21,
                    start_date: '2024-05-01',
                    end_date: '2024-07-13',
                    my_role: 'member',
                    study_name: '모각코 스터디'
                }
            ]
        };
        const { username, point, review, studies } = data;
        const topReviews = findTopTwoReviews(review);
        setUsername(username);
        setPoint(point);
        setReview(review);
        setTopReviews(topReviews);
        setStudies(studies);
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

    const handleStudyClick = async (studyId) => {
        try {
            const studyInfo = await getStudyInfoAPI(studyId);
            navigate('/studyGroup', { state: { studyInfo } });
        } catch (error) {
            console.error('스터디 정보를 불러오는 중 오류 발생:', error);
        }
    };

    let levelImage;
    if (point >= 10 && point < 20) {
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
                userId={this.state.userId}
                token={this.state.token}
                point={this.state.point}
                onUpdateNickname={handleUpdateNickname}
                initialNickname={username}
            />
        </div>
    );
}

export default MyPage;

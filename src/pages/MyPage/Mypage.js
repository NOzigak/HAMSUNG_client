import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
import { fetchUserData } from '../../api/MyPageAPI';
import { getStudies } from '../../api/MyPageAPI';
import "./MyPage.css";


class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteIDModal: false,
            showDeleteConfirmModal: false,
            showEditProfileModal: false,
            showReviewModal: false,
            currentPage: 1,
            username: '',
            point: 0,
            review: {},
            topReviews: [],
        };
    }

    componentDidMount() {
        this.loadUserData();
    }

    loadUserData = () => {
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
        const totalPages = studies.member_num;
        this.setState({ username, point, review, topReviews, studies, totalPages });
    };

    //loadUserData = async () => {
    //const userId = 'someUserId'; 
    //const token = 'someToken'; 
    //try {
    //        const data = await fetchUserData(userId, token);
    //      const { username, point, reviewResponseDto: review } = data;
    //      const topReviews = findTopTwoReviews(review);
    //        this.setState({ username, point, review, topReviews });
    //  } catch (error) {
    //      console.error("접속에 실패했습니다.:", error);
    //  }
    //};

    loadStudies = async () => {
        try {
            const studies = await getStudies(this.state.userId);
            this.setState({ studies });
        } catch (error) {
            console.error('스터디 정보를 불러오는 중 오류 발생:', error);
        }
    };
    

    handleDeleteClick = () => {
        this.setState({ showDeleteIDModal: true });
    };

    handleCloseDeleteIDModal = () => {
        this.setState({ showDeleteIDModal: false });
    };

    handleConfirmDelete = () => {
        this.setState({ showDeleteIDModal: false, showDeleteConfirmModal: true });
    };

    handleCloseDeleteConfirmModal = () => {
        this.setState({ showDeleteConfirmModal: false });
    };

    handleEditClick = () => {
        this.setState({ showEditProfileModal: true });
    };

    handleCloseEditProfileModal = () => {
        this.setState({ showEditProfileModal: false });
    };

    handleUpdateNickname = (newNickname) => {
        this.setState({ username: newNickname });
    };

    handleEvaluateClick = () => {
        this.setState({ showReviewModal: true });
    };

    handleCloseReviewModal = () => {
        this.setState({ showReviewModal: false });
    };

    nextPage = () => {
        this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
    };

    prevPage = () => {
        this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
    };

    render() {
        let levelImage;
        const { username, point, topReviews, studies } = this.state;
    
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
                <button className="deleteID" onClick={this.handleDeleteClick}>회원탈퇴</button>
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
                    <button className="edit-profile-button" onClick={this.handleEditClick}>프로필 수정하기</button>
                </div>
                <p className="study-list">참여 중인 스터디</p>
                <div className="inline"></div>
    
                {this.state.showReviewModal && (
                    <ReviewModal
                        closeReviewModal={this.handleCloseReviewModal}
                        currentPage={this.state.currentPage}
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}
                    />
                )}
    
            
    
                {studies && studies.length > 0 ? (
                    studies.map((study, index) => (
                        <div className="myStudy" key={index}>
                            <p className="studyTitle">{study.study_name} ({study.my_role === 'leader' ? '그룹장' : '멤버'})</p>
                            {study.end_date === null ? (
                                <Link to="/studyGroup">
                                    <button className="studyList-button">바로가기</button>
                                </Link>
                            ) : (
                                <button
                                    className="studyList-button"
                                    onClick={() => this.handleEvaluateClick(study.id)}
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
                    show={this.state.showDeleteIDModal}
                    handleClose={this.handleCloseDeleteIDModal}
                    handleConfirm={this.handleConfirmDelete}
                />
    
                <DeleteConfirm
                    show={this.state.showDeleteConfirmModal}
                    handleClose={this.handleCloseDeleteConfirmModal}
                />
    
                <EditProfile
                    show={this.state.showEditProfileModal}
                    handleEdit={this.handleCloseEditProfileModal}
                    userId={this.state.userId}
                    token={this.state.token}
                    point={this.state.point}
                    onUpdateNickname={this.handleUpdateNickname}
                    initialNickname={username}
                />
            </div>
        );
    }
    
}

export default MyPage;


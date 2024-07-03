import React, { Component } from 'react';
import "./MyPage.css";
import { Link } from 'react-router-dom';
import { Navbar } from "../../components/Navbar/Navbar";
import DeleteID from "../../components/DeleteID/DeleteID";
import DeleteConfirm from "../../components/DeleteConfirm/DeleteConfirm";
import EditProfile from "../../components/EditProfile/EditProfile";
import profileImage from '../../assets/person.png';
import lvSilver from "../../assets/silver.png";
import lvGold from "../../assets/gold.png";
import noLate from "../../assets/ptag.png";
import slowAnswer from "../../assets/ntag.png";
import ReviewModal from '../../components/ReviewModal/ReviewModal';

export const nickname = "노성균";
export let point = 23;

class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteIDModal: false,
            showDeleteConfirmModal: false,
            showEditProfileModal: false,
            showReviewModal: false,
            currentPage: 1,
        };
    }

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
        const studyTitle1 = "면접 스터디(그룹장)";
        const studyTitle2 = "모각코 스터디(멤버)";

        if (point >= 10 && point < 20) {
            levelImage = lvSilver;
        } else if (point >= 20 && point < 30) {
            levelImage = lvGold;
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
                    <p className="user-ID"> {nickname} 님</p>
                    <div className="user-point">나의 포인트: {point} P</div>
                    <p className="user-tag">나의 태그: </p>
                    <img className="main-pTag" src={noLate} alt="Camera" />
                    <img className="main-nTag" src={slowAnswer} alt="Camera" />
                    <div className="level-image">
                        <img src={levelImage} alt="Level" />
                    </div>
                    <button className="edit-profile-button" onClick={this.handleEditClick}>프로필 수정하기</button>
                </div>
                <p className="study-list">참여 중인 스터디</p>
                <div className="inline"></div>

                
                {this.state.showReviewModal && (
                    <ReviewModal
                        closeModal={this.handleCloseReviewModal}
                        currentPage={this.state.currentPage} 
                        nextPage={this.nextPage}
                        prevPage={this.prevPage}
                    />
                )}

                <div className="myStudy">
                    <p className="studyTitle">{studyTitle1}</p>
                    <Link to="/studyGroup">
                        <button className="studyList-button">바로가기</button>
                    </Link>
                </div>

                <div className="myStudy">
                    <p className="studyTitle">{studyTitle2}</p>
                    <button className="studyList-button" onClick={this.handleEvaluateClick}>평가하기</button>
                </div>

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
                />
            </div>
        );
    }
}

export default MyPage;

import React, { useState, useEffect } from 'react';
import ModalPage from './ModalPage';
import { ReviewAPI, getMemberName } from '../../api/MyPageAPI';
import "./ReviewModal.css";

const ReviewModal = ({ closeReviewModal, currentPage, nextPage, prevPage, totalPages, study_id, userIds }) => {
    const [pageState, setPageState] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [memberNames, setMemberNames] = useState([]);

    useEffect(() => {
        const fetchMemberNames = async () => {
            try {
                const names = await getMemberName(study_id);
                const studyMemberNames = names.map(member => member.username);
                setMemberNames(studyMemberNames);
            } catch (error) {
                console.error('스터디 멤버 이름 가져오기 실패:', error);
            }
        };

        fetchMemberNames();
    }, [study_id]);

    const handleOptionChange = (page, listType, value) => {
        setPageState(prevState => {
            const prevSelectedOptions = prevState[page]?.[listType] || [];
            const newSelectedOptions = prevSelectedOptions.includes(value)
                ? prevSelectedOptions.filter(option => option !== value)
                : [...prevSelectedOptions, value];

            return {
                ...prevState,
                [page]: {
                    ...prevState[page],
                    [listType]: newSelectedOptions
                }
            };
        });
    };

    const getSelectedOptions = (page, listType) => {
        return pageState[page]?.[listType] || [];
    };

    const handleSubmit = async () => {
        try {
            const studyMemberData = await getMemberName(study_id);
            console.log(studyMemberData);
            for (let member of studyMemberData) {
                const userId = member.user_id;
                const reviewData = {
                    noLate: getSelectedOptions(currentPage, 'PreviewList').includes("지각하지 않아요"),
                    faithful: getSelectedOptions(currentPage, 'PreviewList').includes("성실하게 참여해요"),
                    kind: getSelectedOptions(currentPage, 'PreviewList').includes("친절해요"),
                    unkind: getSelectedOptions(currentPage, 'NreviewList').includes("불친절해요"),
                    fastAnswer: getSelectedOptions(currentPage, 'PreviewList').includes("연락을 빠르게 확인해요"),
                    slowAnswer: getSelectedOptions(currentPage, 'NreviewList').includes("답장이 느려요"),
                    passive: getSelectedOptions(currentPage, 'NreviewList').includes("소극적으로 참여해요"),
                    absent: getSelectedOptions(currentPage, 'NreviewList').includes("지각,결석,과제 미제출이 잦아요"),
                };
        
                const result = await ReviewAPI(userId, reviewData);
                console.log(`리뷰 등록 결과 (${member.username}):`, result.message);
            }
    
            //setSubmissionStatus('리뷰 등록 완료');
        } catch (error) {
            console.error('리뷰 등록 중 오류 발생:', error);
            setSubmissionStatus('리뷰 등록 실패');
        }
    };

    return (
        <div className="review-modal">
            <div className="review-content">
                <ModalPage 
                    page={currentPage}
                    memberName={memberNames[currentPage - 1]} // currentPage에 맞는 멤버의 이름을 전달
                    handleOptionChange={handleOptionChange}
                    getSelectedOptions={getSelectedOptions}
                />
                <button className="close-review-button" onClick={closeReviewModal}>✖</button>
                <div>
                    {submissionStatus && <p>{submissionStatus}</p>}
                </div>
                <div>
                    {currentPage !== 1 && <button className="front-button" onClick={prevPage}>{'<'}</button>}
                    {currentPage !== totalPages && <button className="back-button" onClick={nextPage}>{'>'}</button>}
                </div>
                <button onClick={handleSubmit} className="submit-button">완료</button>
            </div>
        </div>
    );
};

export default ReviewModal;

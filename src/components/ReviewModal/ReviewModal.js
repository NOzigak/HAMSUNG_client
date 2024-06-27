import React, { useState } from 'react';
import ModalPage from './ModalPage';
import { submitReview } from '../../api/ReviewAPI';
import "./ReviewModal.css";

const ReviewModal = ({ closeModal, currentPage, nextPage, prevPage }) => {
    const totalPages = 4; 
    const [pageState, setPageState] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');

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
        const reviewData = {
            userId: currentPage, // Assuming 'currentPage' is userId
            noLate: getSelectedOptions(currentPage, 'PreviewList').includes("지각하지 않아요"),
            faithful: getSelectedOptions(currentPage, 'PreviewList').includes("성실하게 참여해요"),
            kind: getSelectedOptions(currentPage, 'PreviewList').includes("친절해요"),
            unkind: getSelectedOptions(currentPage, 'NreviewList').includes("불친절해요"),
            fastAnswer: getSelectedOptions(currentPage, 'PreviewList').includes("연락을 빠르게 확인해요"),
            slowAnswer: getSelectedOptions(currentPage, 'NreviewList').includes("답장이 느려요"),
            passive: getSelectedOptions(currentPage, 'NreviewList').includes("소극적으로 참여해요"),
            absent: getSelectedOptions(currentPage, 'NreviewList').includes("지각,결석,과제 미제출이 잦아요"),
        };

        const result = await submitReview(reviewData);
        setSubmissionStatus(result.message);
    };

    return (
        <div className="review-modal">
            <div className="review-content">
                <ModalPage 
                    page={currentPage}
                    pageState={pageState}
                    handleOptionChange={handleOptionChange}
                    getSelectedOptions={getSelectedOptions}
                />
                <button className="close-review-button" onClick={closeModal}>✖</button>
                <div>
                    {submissionStatus && <p>{submissionStatus}</p>}
                </div>
                <div>
                    {currentPage !== 1 && <button className="front-button" onClick={prevPage}>이전</button>}
                    {currentPage !== totalPages && <button className="back-button" onClick={nextPage}>다음</button>}
                </div>
                <button onClick={handleSubmit} className="submit-button">리뷰 제출</button>
            </div>
        </div>
    );
};

export default ReviewModal;

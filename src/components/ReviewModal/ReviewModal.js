import React, { useState, useEffect } from 'react';
import ModalPage from './ModalPage';
import { ReviewAPI, getMemberName } from '../../api/MyPageAPI'; // getMemberName 가져오기
import "./ReviewModal.css";
//오류
const ReviewModal = ({ closeReviewModal, currentPage, nextPage, prevPage, totalPages, study_id, userIds }) => {
    const [pageState, setPageState] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [memberNames, setMemberNames] = useState([]); // 멤버 이름을 저장

    useEffect(() => {
        console.log("ReviewModal study_id:", study_id);
    }, [study_id]);

    useEffect(() => {
        const fetchMemberNames = async () => {
            try {
                const names = await getMemberName(study_id); // study_id를 사용하여 멤버 이름 가져오기
                console.log("멤버 조회:",names);
                setMemberNames(names.username);
                console.log("멤버:",memberNames);
            } catch (error) {
                console.error('스터디 멤버 이름 가져오기 실패:', error);
            }
        };

        fetchMemberNames();
    }, [study_id]); // study_id가 변경될 때마다 실행

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
            // 스터디 멤버 조회 API를 사용하여 userId 추출
            const studyMemberData = await getMemberName(study_id);
            console.log("참여 멤버:",studyMemberData) ;
            const userId = studyMemberData.id; // 스터디 멤버 조회 결과에서 user_id를 추출합니다.
            console.log("참여멤버 ID:",userId);

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
            setSubmissionStatus(result.message);
        } catch (error) {
            console.error('참여 멤버 정보를 가져오는 중 오류 발생:', error);
        }
    };

    return (
        <div className="review-modal">
            <div className="review-content">
                <ModalPage 
                    page={currentPage}
                    memberName={memberNames}
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

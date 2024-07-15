import React, { useState, useEffect } from 'react';
import ModalPage from './ModalPage';
import { ReviewAPI, getMemberName } from '../../api/MyPageAPI';
import "./ReviewModal.css";

const ReviewModal = ({ closeReviewModal, study_id }) => {
    const [selectedMember, setSelectedMember] = useState(null);
    const [pageState, setPageState] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [memberNames, setMemberNames] = useState([]);
    const [showCompleteButton, setShowCompleteButton] = useState(false); // 완료 버튼 숨김 상태

    useEffect(() => {
        const fetchMemberNames = async () => {
            try {
                const names = await getMemberName(study_id);
                const studyMemberNames = names.map(member => ({ id: member.user_id, username: member.username }));
                setMemberNames(studyMemberNames);
            } catch (error) {
                console.error('스터디 멤버 이름 가져오기 실패:', error);
            }
        };

        fetchMemberNames();
    }, [study_id]);

    const handleOptionChange = (listType, value) => {
        setPageState(prevState => {
            const prevSelectedOptions = prevState[listType] || [];
            const newSelectedOptions = prevSelectedOptions.includes(value)
                ? prevSelectedOptions.filter(option => option !== value)
                : [...prevSelectedOptions, value];

            return {
                ...prevState,
                [listType]: newSelectedOptions
            };
        });
    };

    const getSelectedOptions = (listType) => {
        return pageState[listType] || [];
    };

    const handleSubmit = async () => {
        if (!selectedMember) {
            setSubmissionStatus('리뷰할 멤버를 선택해주세요');
            return;
        }

        try {
            const reviewData = {
                noLate: getSelectedOptions('PreviewList').includes("지각하지 않아요"),
                faithful: getSelectedOptions('PreviewList').includes("성실하게 참여해요"),
                kind: getSelectedOptions('PreviewList').includes("친절해요"),
                unkind: getSelectedOptions('NreviewList').includes("불친절해요"),
                fastAnswer: getSelectedOptions('PreviewList').includes("연락을 빠르게 확인해요"),
                slowAnswer: getSelectedOptions('NreviewList').includes("답장이 느려요"),
                passive: getSelectedOptions('NreviewList').includes("소극적으로 참여해요"),
                absent: getSelectedOptions('NreviewList').includes("지각,결석,과제 미제출이 잦아요"),
            }; 
        
            const result = await ReviewAPI(selectedMember.id, reviewData);
            console.log(`리뷰 등록 결과 (${selectedMember.username}):`, result.message);
        } catch (error) {
            console.error('리뷰 등록 중 오류 발생:', error);
            setSubmissionStatus('리뷰 등록 실패');
        }
    };

    return (
        <div className="review-modal">
            <div className={ `review-content ${selectedMember ? '' : 'initial-page'}`}>
                <div>
                  <select className="memberSelectBox" onChange={(e) => {
                     setSelectedMember(memberNames.find(member => member.id === parseInt(e.target.value)));
                     setShowCompleteButton(true); // 멤버 선택 시 완료 버튼 보이기
                     }}>
                     <option value="">리뷰할 멤버 선택</option>
                      {memberNames.map(member => (
                         <option key={member.id} value={member.id}>{member.username}</option>
                      ))}
                  </select>
                </div>
                {selectedMember && (
                    <ModalPage 
                        memberName={selectedMember.username}
                        handleOptionChange={handleOptionChange}
                        getSelectedOptions={getSelectedOptions}
                    />
                )}
                <button className="close-review-button" onClick={closeReviewModal}>✖</button>
                {showCompleteButton && (
                    <button onClick={handleSubmit} className="submit-button">완료</button>
                )}
            </div>
        </div>
    );
};

export default ReviewModal;

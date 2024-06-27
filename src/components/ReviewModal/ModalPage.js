import React from 'react';
import "./ReviewModal.css";

const ModalPage = ({ page, pageState, handleOptionChange, getSelectedOptions }) => {
    const PreviewList = ["지각하지 않아요", "성실하게 참여해요", "연락을 빠르게 확인해요", "친절해요"];
    const NreviewList = ["불친절해요", "소극적으로 참여해요", "지각,결석,과제 미제출이 잦아요", "답장이 느려요"];

    return (
        <div>
            <h2 className="review-message-design">멤버 {page} 리뷰</h2>
            <div className="checkbox-container">
                {PreviewList.map((item, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`preview-${page}-${item}`}
                            name={`preview-${page}`}
                            value={item}
                            checked={getSelectedOptions(page, 'PreviewList').includes(item)}
                            onChange={() => handleOptionChange(page, 'PreviewList', item)}
                            className="checkbox-button"
                        />
                        <label htmlFor={`preview-${page}-${item}`} className="checkbox-label">{item}</label>
                    </div>
                ))}
            </div>
            <div className="checkbox-container">
                {NreviewList.map((item, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            id={`nreview-${page}-${item}`}
                            name={`nreview-${page}`}
                            value={item}
                            checked={getSelectedOptions(page, 'NreviewList').includes(item)}
                            onChange={() => handleOptionChange(page, 'NreviewList', item)}
                            className="checkbox-button"
                        />
                        <label htmlFor={`nreview-${page}-${item}`} className="checkbox-label">{item}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModalPage;


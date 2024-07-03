import React from 'react';
import ModalPage from './ModalPage';
import "./ReviewModal.css";

const ReviewModal = ({ closeModal, currentPage, nextPage, prevPage }) => {
    const totalPages = 4; 

    return (
        <div className="review-modal">
            <div className="review-content">
              <ModalPage page={currentPage} />
              <button className="close-review-button" onClick={closeModal}>✖</button>
              <div>
                 {currentPage !== 1 && <button className="front-button" onClick={prevPage}>{'<'}</button>}
                 {currentPage !== totalPages && <button className="back-button" onClick={nextPage}>{'>'}</button>}
              </div>
              <div>
                 <button className="submit-button">완료</button>
              </div>
              
            </div>
        </div>
    );
};

export default ReviewModal;

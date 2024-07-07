
import { useNavigate } from "react-router-dom";
import "./SignupModal.css";

function SignupModal({ setModalOpen, id, title, content, writer }) {
    
    const nav = useNavigate();
    // 모달 끄기 
    const closeModal = (e) => {
        setModalOpen(false);
        nav("/login");
        e.preventDefault();
    };

    return (
        <div className="container">
          <div className="signupModalTitle">
            <p>확인메시지</p>
          </div>
          <div className="signupModalDesc">
            <p>회원가입 성공.</p>
          </div>
          <div className="signupBtnWrapper">
            <button className="signupModalClose" onClick={closeModal}>
                확인
            </button>
          </div>

        </div>
    );
}
export default SignupModal;

import { Link } from "react-router-dom";
import "./SignupPage.css";
import { useEffect, useState } from "react";
import { validateUser } from "../../utils/validate";
import AuthInput from "../../components/AuthInput/AuthInput";
import SignupModal from "../../components/SignupModal/SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/authActions";


const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] =useState({});
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  // 모달 노출 여부
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  const {username, email, password, passwordConfirm} = formData;

  useEffect(() => {
    setErrors(validateUser(formData))
  }, [formData])

  const onChange = (e) => {
    const {name, value} = e.target

    setFormData({
      ...formData,
      [name] : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    setErrors(validateUser(formData))

    if(Object.values(errors)[0].length === 0 && Object.values(errors)[1].length === 0 &&
    Object.values(errors)[2].length === 0 && Object.values(errors)[3].length === 0
    ){
      dispatch(signup(formData));

    } 
  }
  
  // 회원가입 실패, 성공 처리
  useEffect(()=> {
    if(auth.error){
      console.log("오류 발생", auth.error);
      return;
    }
    if(auth.isAuthenticate){
      console.log("회원가입 성공")
      showModal()
      console.log("회원가입 성공");
    }
  }, [auth]);



  return(
    <div className="Wrapper">
      <form className="SignupForm" onSubmit={handleSubmit}>
        <div className="TitleBoard">
            <h1 className="Title">Signup</h1>
        </div>
        
        <AuthInput
          onChange={onChange} 
          text="닉네임을 입력하세요" 
          type="text" 
          value={username}
          error={errors.username}
          name="username"
        />

        <AuthInput
          onChange={onChange} 
          text="이메일을 입력하세요" 
          type="email" 
          value={email}
          error={errors.email}
          name="email"
        />

        <AuthInput
          onChange={onChange} 
          text="비밀번호를 입력하세요" 
          type="password"
          value={password}
          error={errors.password}
          name="password"
        />

        <AuthInput
          onChange={onChange} 
          text="비밀번호 확인" 
          type="password"
          value={passwordConfirm}
          error={errors.passwordConfirm}
          name="passwordConfirm"
        />
        <div>
          <button className="SignupButton">회원가입</button>
          {modalOpen && <SignupModal setModalOpen={setModalOpen} />}
        </div>
        
      </form>
      <div className="Switcher">
        <Link to={"/login"}>로그인하러가기</Link>
      </div>
    </div>
  )
}

export default SignupPage;
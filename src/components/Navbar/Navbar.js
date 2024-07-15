import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import icon from "./../../assets/hamsungIcon.png";
import menu from "./../../assets/menu.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";

export const Navbar = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const onCLickLogin = () => {
        nav("/login");
    }
    const onClickMain = () => {
        nav("/");
    }
    const onClickLogout = async () => {
        dispatch(logout());
        nav("/") //메인페이지로 리디렉션
    }
    const [isOpen, setIsOpen] = useState(false);
    const onClickToggle = () => {
        setIsOpen(!isOpen); // 토글 상태 변경
    };

    return (
        <div className="navbarWrapper">
            <img className="hamsungIcon" src={icon} alt="icon" onClick={onClickMain}/>

            <div className="linkSection">
                <ul className={`menuList ${isOpen ? 'show' : ''}`}>
                    <NavLink to="/mypage">
                        <li>Mypage</li>
                    </NavLink>
                    <NavLink to="/rank">
                        <li>Ranking</li>
                    </NavLink>                    
                </ul>
            </div>
            <div className={`navBtnSection ${isOpen ? 'show' : ''}`}>
                {user ? <button className="logoutBtn" onClick={onClickLogout}>로그아웃</button> :
                    <button className="logoutBtn" onClick={onCLickLogin}>로그인</button>
                }
            </div>
            <img className="toggleBtn" src={menu} onClick={onClickToggle}></img>
        </div>
    )
}
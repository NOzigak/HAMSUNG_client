import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import icon from "./../../assets/hamsungIcon.png";
import menu from "./../../assets/menu.png";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Navbar = () => {
    const user = useSelector(state => state.auth.user);

    const nav = useNavigate();
    const onCLickLogin = () => {
        nav("/login");
    }
    const onClickMain = () => {
        nav("/");
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
                {user ? <button className="logoutBtn">로그아웃</button> :
                    <button className="logoutBtn" onClick={onCLickLogin}>로그인</button>
                }
            </div>
            <img className="toggleBtn" src={menu} onClick={onClickToggle}></img>
        </div>
    )
}
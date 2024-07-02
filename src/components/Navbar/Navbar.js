import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import icon from "./../../assets/hamsungIcon.png";

export const Navbar = ({user}) => {
    const nav = useNavigate();
    const onCLickLogin = () => {
        nav("/login");
    }

    return (
        <div className="navbarWrapper">
            <div className="logo">
              <NavLink to="/">
                 <img className="hamsungIcon" src={icon} alt="icon"/>
              </NavLink>
            </div>
            
            
            <div className="linkSection">
                <ul>
                    <NavLink to="/mypage">
                        <li>마이페이지</li>
                    </NavLink>
                    <NavLink to="/rank">
                        <li>랭킹</li>
                    </NavLink>                    
                </ul>
            </div>
            <div className="btnSection">
                {user ? <button className="logoutBtn">로그아웃</button> :
                    <button className="logoutBtn" onClick={onCLickLogin}>로그인</button>
                }
            </div>
        </div>
    )
}
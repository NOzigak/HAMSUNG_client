import { jwtDecode } from "jwt-decode";

const getUserInfo = () => {
   // 액세스 토큰 정보 가져옴
   let token = localStorage.getItem("accessToken");
   const decoded = jwtDecode(token);
   const user_id = decoded.user_id;
   const username = decoded.username;
   return {user_id, username};
}

export default getUserInfo;

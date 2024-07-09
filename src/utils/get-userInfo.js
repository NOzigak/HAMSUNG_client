import base64 from "base-64";
import { jwtDecode } from "jwt-decode";

const getUserInfo = () => {
   // 액세스 토큰 정보 가져옴
   let token = localStorage.getItem("accessToken");
   const decoded = jwtDecode(token);
   const dec = JSON.stringify(decoded, null, 2);
   return dec;
}

export default getUserInfo;

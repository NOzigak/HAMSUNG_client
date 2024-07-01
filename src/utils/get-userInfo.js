import { useSelector } from "react-redux";

const getUserInfo = () => {
    // 액세스 토큰 정보 가져옴
    let token = useSelector(state => state.auth.user); 
    // header . payload . signature
    let payload = token.substring(token.indexOf('.')+1, token.lastIndexOf('.'));
    let dec = JSON.parse(base64.decode(payload));
    
    return dec;
}

export default getUserInfo;



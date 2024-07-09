import client from "./client"


// 로그인 폼데이터로 전송
export const UserLogin = async (userInfo) => {
    const formData = new FormData();
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    try{
        const response = await client.post("/login", formData,
            {
                headers: {"Content-Type": "multipart/form-data"},
                withCredentials: true
            }
        );
        return response.headers.access;
    } catch(error) {
        console.log("로그인 실패", error);
        throw error;
    }
}

// 회원가입
export const UserSignup = async (userInfo) => {

    try{
        const response = await client.post("/users", userInfo);
        return response.data;
    } catch (error) {
        console.log("회원가입 실패", error);
        throw error;
    }
}

// 로그아웃
export const UserLogout = async () => {
    try{
        // 로그아웃 시 토큰도 삭제
        localStorage.removeItem("accessToken");
        console.log("액세스 토큰 삭제")
        const response = await client.post("/logout");
        return response.data;
    } catch (error) {
        console.log("로그아웃 실패", error);
        throw error;
    }
}
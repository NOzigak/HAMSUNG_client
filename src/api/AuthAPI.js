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
        const response = await client.post("/logout");
        // 로그아웃 시 토큰도 삭제
        console.log("access 삭제")
        localStorage.removeItem("accessToken");
        return response.data;
    } catch (error) {
        console.log("로그아웃 실패", error);
        throw error;
    }
}

export const UserReissue = async () => {
    try{
        const response = await client.post("/reissue");
        return response.headers;
    } catch (error) {
        console.log("재발급 실패", error);
        throw error;
    }
}
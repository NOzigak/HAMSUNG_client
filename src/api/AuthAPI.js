import client from "./client"


// 로그인
export const UserLogin = async ({email, password}) => {
    try{
        const response = await client.post("/login", {email, password});
        return response.data;
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

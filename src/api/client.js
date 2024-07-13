import axios from "axios";

const client = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL, // 배포 url은 env로 관리

    headers: {"Content-Type": "application/json"},
    withCredentials: true
});

// 요청 인터셉터 설정
client.interceptors.request.use(
    config => {
        // 액세스 토큰을 로컬 스토리지에서 가져옴
        const token = localStorage.getItem("accessToken");
        //const token = getCookie("accessToken");
        const sanitizedToken = token ? token.replace(/"/g, '') : null;
        if (token) {
            config.headers.access = sanitizedToken;
        } 
        return config;
    },
    error => {
        // 요청 실패 시 특정 작업 수행
        return Promise.reject(error);
    }
);

export const refreshAccessToken = async () => {

    try{
        // 리프레쉬 토큰으로 요청 보내기
        
        const response = await client.post("/reissue");
        const newAccessToken = response.headers.access;
        localStorage.removeItem("accessToken"); //기존 액세스 삭제
        localStorage.setItem("accessToken", newAccessToken); //새로운 액세스 토큰 삽입.
        console.log("access: ", response.headers.access);
        return newAccessToken;

    } catch(error) {
        console.log("토큰 재발급 실패", error);
        return null;
    }
};

const MAX_RETRY = 3;
let retryCnt = 0;
//응답 인터셉터
client.interceptors.response.use(
    response => {
        retryCnt = 0; // 성공적인 응답을 받으면 0으로 초기화.
        return response;
    },
    async (error) => {
        const originalConfig = error.config; //기존에 수행하려고 했던 작업
        if(error.response && error.response.status === 401 && !originalConfig._retry && retryCnt<MAX_RETRY){
            originalConfig._retry = true;
            retryCnt++; // 카운터 증가
            try {
                const newToken = await refreshAccessToken();
                if (newToken){
                    client.defaults.headers.common['access'] = newToken;
                    originalConfig.headers.access = newToken;
                    const response = await client(originalConfig);
                    console.log("재시도 성공", response);
                    return response;
                }
            } catch (refreshError) {
                console.log("재발급 실패했어요..", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default client;


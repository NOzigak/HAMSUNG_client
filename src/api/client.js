import axios from "axios";
import { getCookie } from "../utils/cookies";

const client = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL, // 배포 url은 env로 관리
    headers: {"Content-Type": "application/json"}
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
    try {
        //const refreshToken = localStorage.getItem("refreshToken");
        const refreshToken = getCookie("refreshToken");
        // 리프레쉬 토큰으로 요청 보내기
        const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/reissue`, { refreshToken });
        const newAccessToken = response.data;
        return newAccessToken;
    } catch (error) {
        throw error;
    }
};

// 응답 인터셉터
client.interceptors.response.use(
    response => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config; //기존에 수행하려고 했던 작업
        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            try {
                const newToken = await refreshAccessToken();
                if (newToken){
                    client.defaults.headers.common["Authorization"] = {access : newToken};
                    originalConfig.headers["Authprization"] = {access : newToken};
                    return client(originalConfig);
                }
            } catch (refreshError) {
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);

export default client;


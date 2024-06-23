import axios from "axios";


const client = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL, // 배포 url은 env로 관리
    headers: {"Content-Type": "application/json"}
});

// 요청 인터셉터 설정
client.interceptors.request.use(
    config => {
        // 요청 성공 시 특정 작업 수행
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = {access: token};
        }
        return config;
    },
    error => {
        // 요청 실패 시 특정 작업 수행
        return Promise.reject(error);
    }
)

export const refreshAccessToken = async () => {
    try{
        const refreshToken = localStorage.getItem("refreshToken");

        // 리프레쉬 토큰으로 요청 보내기
        const response = await axios.post("path", {refreshToken})
        const newAccessToken = response.data.accessToken;

        // 새로 발급받은 토큰을 스토리지에 저장
        localStorage.setItem("token", newAccessToken);

        return newAccessToken;
    } catch(error) {
        throw error;
    }

}

client.interceptors.response.use(
    response => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config; //기존에 수행하려고 했던 작업
        if(error.response.status === 401){
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
)

export default client;
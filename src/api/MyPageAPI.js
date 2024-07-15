import client from "./client";

//사용자 정보 조회
export const fetchUserData = async (user_id) => {
    console.log(user_id);
    try {
        const response = await client.get(`/myPage/${user_id}`);
        return response;
    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
            return { status: 401, message: "접속에 실패했습니다." };
        } else {
            return { status: error.response?.status || 500, message: error.message };
        }
    }
};


//회원 탈퇴
export const DeleteUserAPI = async (user_id) => {
    try {
        const response = await client.delete(`/users/${user_id}`);

        return true;
    } catch (error) {
        console.error('회원탈퇴 실패', error);
        return false;
    }
}; 





//리뷰 등록
export const ReviewAPI = async (user_id, reviewData) => {
    try {
        const response = await client.post(`/review/${user_id}`, reviewData);

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { status: response.status, message: response.data.message };

    } catch (error) {
        console.error("Error submitting review:", error);
        return { status: 400, message: "리뷰 등록 실패" };
    }
};

//프로필 수정 
export const EditProfileAPI = async (user_id, newNickname) => {;
    try {
        const response = await client.put(`/users/${user_id}`, { username: newNickname });
        return {
            status: response.status,
            data: response.data,
        };

    } catch (error) {
        console.error("닉네임 업데이트 오류:", error);

        if (error.response) {
            return {
                status: error.response.status,
                message: error.response.data.message,
            };
        } else {
            return {
                status: 500,
                message: "닉네임 업데이트 중 오류가 발생했습니다.",
            };
        }
    }
};


// 사용자 한 명 조회(리뷰 조회)
export const getReviewDataAPI = async (user_id) => {
    try { 
        const response = await client.get(`/users/${user_id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return {
                status: 400,
                message: "해당 사용자가 없습니다."
            };
        } else {
            throw error;
        }
    }
}



//전체 리뷰 조회
//export const getUserReviewsAPI = async (user_id) => {
//    try {
//      const response = await client.get(`users/${user_id}/reviews`);
//      return response;
//    } catch (error) {
//      return error.response;
//    }
//  };

  
//참여 중인 스터디 불러오기
export const getStudies = async (user_id) => {
    try {
        const response = await client.get(`/study/myStudy/${user_id}`);
        return response.data;
    } catch (error) {
        console.error('스터디 정보를 불러오는 중 오류 발생:', error);
        throw error;
    }
};


// 스터디 멤버 조회
export const getMemberName = async (study_id) => {
    try {
        const response = await client.get(`/studymember/${study_id}`);
        return response.data;
    } catch (error) {
        console.error('스터디 멤버 조회 중 오류 발생:', error);
        throw error;
    }
};
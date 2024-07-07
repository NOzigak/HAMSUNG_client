import client from "./client";

//사용자 정보 조회
export const fetchUserData = async (userId, token) => {
    try {
        const response = await client.get(`http://domain.com/users/${userId}/mypage`, {
            headers: {
                'charset': 'utf-8',
                'access': token
            }
        });
        return response.data;
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



//리뷰 등록
export const ReviewAPI = async (userId, reviewData) => {
    try {
        const response = await client.post(`/api/reviews/${userId}`, reviewData, {

        });

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
export const EditProfileAPI = async (userId, newNickname, token) => {
    try {
        const response = await client.put(
            `http://domain.com/users/${userId}`,
            { username: newNickname },
            {
                headers: {
                    'charset': 'utf-8',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error("닉네임 업데이트 오류:", error);
        if (error.response) {
            return { status: error.response.status, message: error.response.data.message };
        } else {
            return { status: 401, message: "invalid username." };
        }
    }
};

//전체 리뷰 조회
export const getUserReviewsAPI = async (userId, token) => {
    try {
      const response = await client.get(`http://domain.com/users/${userId}/reviews`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  
//참여 중인 스터디 불러오기
export const getStudies = async (userId) => {
    try {
        const response = await client.get(`/study/myStudy/${userId}`);
        return response.data;
    } catch (error) {
        console.error('스터디 정보를 불러오는 중 오류 발생:', error);
        throw error;
    }
};

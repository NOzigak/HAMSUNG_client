import axios from 'axios';

//리뷰 등록
export const ReviewAPI = async (userId, reviewData) => {
    try {
        const response = await axios.post(`/api/reviews/${userId}`, reviewData, {
            headers: {
                'Content-Type': 'application/json',
            },
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
        const response = await axios.put(
            `http://domain.com/users/${userId}`,
            { username: newNickname },
            {
                headers: {
                    'Content-Type': 'application/json',
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
      const response = await axios.get(`http://domain.com/users/${userId}/reviews`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  };



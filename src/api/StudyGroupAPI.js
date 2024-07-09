import client from "./client"

//스터디 기본 정보 호출
export const getStudyInfoAPI = async (studyId) => {
  try {
    const response = await client.get(`/study/${studyId}`, {

    });
    return response;
  }  catch (error) {
    console.error("스터디 정보 조회 오류:", error);
    if (error.response) {
        return { status: error.response.status, message: error.response.data.message };
    } else {
        return { status: 400, message: "존재하지 않는 스터디입니다." };
    }
}
};


//스터디 종료
export const finishStudyAPI = async (studyId) => {
    try {
        const response = await client.patch(`/api/study/${studyId}/end`, {}, {

        });

        return { status: response.status, message: response.data.message };

    } catch (error) {
        console.error("Error finishing study:", error);
        return { status: error.response?.status || 500, message: "스터디 종료 실패" };
    }
};

// study manage 주차별 생성
export const saveWeeklyStudyData = async (studyId, weekIndex, attendance, late, absent, homework) => {
    try {
      const response = await client.post(
        `/study/${studyId}/manage`,
        {
          weekIndex: weekIndex,
          attendance: attendance,
          late: late,
          absent: absent,
          homework: homework
        }
      );
      return response.data;
    } catch (error) {
      console.error("스터디 관리 정보 저장 오류:", error);
      throw error;
    }
};

// Todo 생성
export const createTodo = async (todoData) => {
    try {
      const response = await client.post(`/study/${todoData.study_id}/posts`, todoData);
      
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('이 필드는 필수항목입니다.', error.response.data);
        throw new Error(`일정 생성 실패: ${error.response.data}`);
      } else {
        console.error('일정 생성 오류', error.message);
        throw error;
      }
    }
  };

// Todo 조회
export const getTodo = async (studyId, due_date) => {
  try {
    const response = await client.get(`/study/${studyId}/${due_date}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { status: "200 OK", message: "해당 날짜로 기록된 일정이 없습니다." };
    } else {
      throw error;
    }
  }
};

// Todo 삭제
export const deleteTodo = async (postId, token) => {
  try {
    const response = await client.delete(`/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return { detail: "이 작업을 수행할 권한(permission)이 없습니다." };
    } else {
      console.error('일정 삭제 실패:', error.message);
      throw error;
    }
  }
};
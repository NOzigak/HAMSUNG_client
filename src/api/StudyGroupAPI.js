import client from "./client"

//스터디 기본 정보 호출
export const getStudyInfoAPI = async (study_id) => {
  try {
    const response = await client.get(`/study/${study_id}`, {

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
export const finishStudyAPI = async (study_id) => {
  console.log(study_id);
    try {
        const response = await client.patch(`/study/${study_id}/end`);
        return { status: response.status, message: response.data.message };
    } catch (error) {
        console.error("Error finishing study:", error);
        return { status: error.response?.status || 500, message: "스터디 종료 실패" };
    }
};

// study manage 주차별 생성
export const saveWeeklyStudyData = async (study_id, week, attendance, late, absent, homework) => {
    try {
      const response = await client.post(
        `/study/${study_id}/manage`,
        {
          week: week,
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

// Study manage 주차별 조회
export const getWeeklyStudyData = async (study_id, week) => {
  console.log("api 인수 조회:",study_id, week);
  try {
      const response = await client.get(`/study/${study_id}/manage/${week}`);
      console.log(response);
      return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { status: "200 OK", message: "해당 주차의 기록이 없습니다." };
    } else {
      throw error;
    }
  }
};

// Todo 생성
export const createTodo = async (study_id, description, due_date) => {
  try {
    const response = await client.post(`/study/${study_id}/posts`, {
      type: "schedule",
      due_date: due_date,
      description: description,
      study_id: study_id
    });

    console.log('일정 추가 성공:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('일정 생성 실패:', error.response.data);
      throw new Error(`일정 생성 실패: ${error.response.data}`);
    } else {
      console.error('일정 생성 오류:', error.message);
      throw error;
    }
  }
};

// Todo 조회
export const getTodo = async (study_id) => {
  try {
    const response = await client.get(`/study/${study_id}/posts?type=schedule`);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { status: "200 OK", message: "해당 날짜로 기록된 일정이 없습니다." };
    } else {
      throw error;
    }
  }
};

// Todo 삭제
export const deleteTodo = async (post_id) => {
  try {
    const response = await client.delete(`/posts/${post_id}`, {
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

// 특정 날짜 Todo 조회
export const getTargetTodo = async (study_id, currentDate) => {
  //console.log("날짜별 일정 조회:",study_id);
  try {
    const response = await client.get(`/study/${study_id}/${currentDate}`);
    //console.log('현재 스터디 id:', response);
    return response;
  } catch (error) {
    if (error.response) {
      console.error('특정 날짜의 일정 조회 실패:', error.response.data);
      throw new Error(`특정 날짜의 일정 조회 실패: ${error.response.data}`);
    } else {
      console.error('특정 날짜의 일정 조회 오류:', error.message);
      throw error;
    }
  }
};
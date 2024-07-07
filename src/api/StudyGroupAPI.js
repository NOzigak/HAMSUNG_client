import axios from 'axios';

//스터디 기본 정보 호출
export const getStudyInfoAPI = async (studyId) => {
  try {
    const response = await axios.get(`http://domain.com/study/${studyId}`, {

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
        const response = await axios.patch(`/api/study/${studyId}/end`, {}, {

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
      const response = await axios.post(
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
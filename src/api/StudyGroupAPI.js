import axios from 'axios';

//스터디 종료
export const finishStudyAPI = async (studyId) => {
    try {
        const response = await axios.post(`/api/study/${studyId}/end`, {}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { status: response.status, message: response.data.message };

    } catch (error) {
        console.error("Error finishing study:", error);
        return { status: error.response?.status || 500, message: "스터디 종료 실패" };
    }
};

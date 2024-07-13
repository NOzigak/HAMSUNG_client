import client from "./client";

// 공지사항 전체 조회
export const getNoticeListAPI = async (study_id, type) => {
    console.log("공지사항 전체조회:",study_id);
    try {
        // 유효하지 않은 type 파라미터 처리
        if (type !== 'announce' && type !== 'schedule') {
            throw { status: 400, message: '잘못된 유형 매개변수입니다' };
        }

        // 공지사항 조회 API 호출
        const response = await client.get(`/study/${study_id}/posts?type=${type}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 && error.response.data.status === '404 NOT_FOUND') {
                console.log('해당 스터디에 등록된 공지사항이 없습니다.');
                throw { status: 404, message: '해당 스터디에 등록된 공지사항이 없습니다.' };
            } else if (error.response.status === 400 && error.response.data.status === '400 BAD_REQUEST') {
                // 유효하지 않은 type 파라미터인 경우
                console.log("Invalid type parameter");
                throw { status: 400, message: "Invalid type parameter" };
            }
        } else {
            console.error("해당 id의 스터디가 존재하지 않습니다!", error.message);
            throw { status: 500, message: "해당 id의 스터디가 존재하지 않습니다!" };
        }
    } 
};


// 공지사항 생성
export const createNoticeAPI = async (inputData, studyId) => {
    try {
        const response = await client.post(`/study/${studyId}/posts`, inputData);
        return response.data;
    } catch (error) {
        console.log("공지사항 생성 실패", error);
        throw error;
    }
}



// 공지사항 삭제
export const deleteNoticeAPI = async (postId) => {
    try {
        const response = await client.delete(`/posts/${postId}`);
        if (response.status === 200) {
            return {
                status: "200 OK",
                message: "공지사항/일정이 삭제되었습니다."
            };
        } else {
            throw new Error("Unexpected response status");
        }
    } catch (error) {
        console.log("이 작업을 수행할 권한(permission)이 없습니다.", error);
        throw error;
    }
}


// 공지사항 상세 조회
export const getTargetNotice = async (postId) => {
    try {
        const response = await client.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.log("해당 id의 공지사항이 존재하지 않습니다.", error);
        throw error;
    }
}
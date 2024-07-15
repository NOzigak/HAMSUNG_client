import client from "./client";

// 공지사항 전체 조회
export const getNoticeListAPI = async (study_id) => {
    try {
        console.log("1공지사항 스터디:", study_id);
        const response = await client.get(`/study/${study_id}/posts?type=announcement`);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 && error.response.data.status === '404 NOT_FOUND') {
                console.log('해당 스터디에 등록된 공지사항이 없습니다.');
                return []; // 공지사항이 없을 때 빈 배열 반환
            } else {
                console.error("해당 id의 스터디가 존재하지 않습니다!", error.message);
                throw { status: 500, message: "해당 id의 스터디가 존재하지 않습니다!" };
            }
        }
        throw error;
    }
};



// 공지사항 생성 
export const createNoticeAPI = async (inputData, study_id) => {
    
    try {
        const response = await client.post(`/study/${study_id}/posts`, inputData);
        return response.data;
    } catch (error) {
        console.log("공지사항 생성 실패", error);
        throw error;
    }
}



// 공지사항 삭제
export const deleteNoticeAPI = async (post_id) => {
    try {
        const response = await client.delete(`/posts/${post_id}`);
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
export const getTargetNotice = async (post_id) => {
    try {
        const response = await client.get(`/posts/${post_id}`);
        return response.data;
    } catch (error) {
        console.log("해당 id의 공지사항이 존재하지 않습니다.", error);
        throw error;
    }
}
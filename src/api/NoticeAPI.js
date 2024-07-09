import client from "./client";

// 공지사항 전체 조회
export const getNoticeList = async (studyId, type) => {
    try {
        // 유효하지 않은 type 파라미터 처리
        if (type !== 'announce' && type !== 'schedule') {
            throw { status: 400, message: '잘못된 유형 매개변수입니다' };
        }

        // 공지사항 조회 API 호출
        const response = await client.get(`/study/${studyId}/posts?type=${type}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404 && error.response.data.status === '404 NOT_FOUND') {
                // 스터디에 등록된 공지사항이 없는 경우
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


// 공지사항 삭제


// 공지사항 상세 조회
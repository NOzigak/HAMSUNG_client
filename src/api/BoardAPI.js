import client from "./client"

// 모집글 전체 조회
export const getBoardsRequest = async () => {
    try{
        const response = await client.get("/recruits");
        return response.data;
    } catch (error) {
        console.log("모집글 목록을 가져오는데 실패했습니다.", error)
        throw error;
    }
}

// 모집글 상세 조회
export const getTargetBoard = async (id) => {
    try {
        const response = await client.get(`/recruits/${id}`);
        return response.data;
    } catch (error) {
        console.log("모집글 상세정보를 불러오는데 실패했습니다.", error);
        throw error;
    }
}

// 모집글 수정
export const updateBoardRequest = async (id, inputData) => {
    try{
        const response = await client.put(`/recruits/${id}`, inputData);
        return response.data;
    } catch (error) {
        console.log("모집글을 수정하는데 실패하였습니다.", error);
        throw error;
    }
}

// 모집글 삭제
export const deleteBoardRequest = async (id) => {
    try{
        const response = await client.delete(`/recruits/${id}`);
        return response.data;
    } catch (error) {
        console.log("모집글을 삭제하는데 실패하였습니다.", error);
        throw error;
    }
}

// 모집글 생성
export const createBoardRequest = async (inputData) => {
    try{
        const response = await client.post("/recruits", inputData);
        return response.data;
    } catch (error){
        console.log("모집글을 생성하는데 실패하였습니다.", error);
        throw error;
    }
}

// 모집글 모집 상태 변경
export const toggleRecruitmentStatus = async (boardId) => {
    try{
        const response = await client.put(`/recruits/${boardId}/isrecruit`);
        return response.data;
    } catch (error) {
        console.log("모집상태 전환에 실패했습니다.", error);
        throw error;
    }

}

//스터디 조회수 증가

//스터디 지원하기
export const applyForStudy = async (recruit_id) => {
    try{
        const response = await client.post(`/recruits/${recruit_id}`);
        return response.data;
    } catch (error) {
        console.log("스터디를 지원하는데 실패했습니다.", error);
        throw error;
    }
}

//스터디 신청인원 조회
export const getApplicants = async (recruit_id) => {
    try{
        const response = await client.get(`/recruits/${recruit_id}/members`);
        return response.data;
    } catch (error) {
        console.log("신청자 목록을 가져오는데 실패했습니다.", error);
        throw error;
    }
}

// 스터디 멤버 승인
export const approveMember = async (memberId) => {
    try {
        const response = await client.patch(`/recruits/${memberId}/members`);
        return response.data;
    } catch (error) {
        console.log("멤버 승인에 실패했습니다.", error);
        throw error;
    }
}
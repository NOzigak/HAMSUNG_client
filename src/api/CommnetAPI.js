import client from "./client"

// 모집글 댓글 조회
export const getCommentsRequest = async (recruitId) => {
    try {
        const response = await client.get(`/comments/recruits/${recruitId}`);
        return response.data;
    } catch (error) {
        console.log("댓글을 가져오는데 실패했습니다.", error);
        throw error;
    }
}

// 댓글 작성 
// commnetInfo : 토큰으로 추출한 유저 id + text
export const addCommentRequest = async (recruit_id, commentInfo) => {
    try {
        const response = await client.post(`/recruits/${recruit_id}/comments`, commentInfo);
        return response.data;
    } catch (error) {
        console.log("댓글 작성에 실패했습니다.", error);
        throw error;
    }
}

// 댓글 삭제
export const deleteCommentRequest = async (commentId) => {
    try {
        const response = await client.delete(`/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.log("댓글 삭제에 실패했습니다.", error);
        throw error;
    }
}

// 대댓글 작성
// replyInfo: username, userId, text
export const addReplyRequest = async (parnetId, replyInfo) => {
    try {
        const response = await client.post(`/child-comments/${parnetId}`, replyInfo);
        return response.data;
    } catch (error) {
        console.log("대댓글 작성에 실패했습니다.", error);
        throw error;
    }
}

// 대댓글 삭제
export const deleteReplyRequest = async (childCommentId) => {
    try {
        const response = await client.delete(`/child-comments/${childCommentId}`);
        return response.data;
    } catch (error) {

    }
}


import { addCommentRequest, addReplyRequest, deleteCommentRequest, deleteReplyRequest, getCommentsRequest } from "../api/CommnetAPI";

// 댓글, 대댓글 정보 가져오는 액션 생성자
const GET_COMMENTS_REQUEST = "GET_COMMENTS_REQUEST";
const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
const GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE";

const ADD_COMMENT_REQUEST = "GET_COMMENT_REQUEST";
const ADD_COMMENT_SUCCESS = "GET_COMMENT_SUCCESS";
const ADD_COMMENT_FAILURE = "GET_COMMENT_FAILURE";

const DELETE_COMMENT_REQUEST = "GET_COMMENT_REQUEST";
const DELETE_COMMENT_SUCCESS = "GET_COMMENT_SUCCESS";
const DELETE_COMMENT_FAILURE = "GET_COMMENT_FAILURE";

// 대댓글 액션
const ADD_REPLY_REQUEST = "ADD_REPLY_REQUEST";
const ADD_REPLY_SUCCESS = "ADD_REPLY_SUCCESS";
const ADD_REPLY_FALIURE = "ADD_REPLY_FALIURE";

const DELETE_REPLY_REQUEST = "DELETE_REPLY_REQUEST";
const DELETE_REPLY_SUCCESS = "DELETE_REPLY_SUCCESS";
const DELETE_REPLY_FAILURE = "DELETE_REPLY_FAILURE";

// 상세 페이지에 해당하는 댓글 불러오는액션
export const getCommnet = (boardId) => async (dispatch) => {
    dispatch({type: GET_COMMENTS_REQUEST});
    try{
        const response = await getCommentsRequest(boardId);
        dispatch({type: GET_COMMENTS_SUCCESS, payload: response});
    } catch (error) {
        dispatch({type: GET_COMMENTS_FAILURE, payload: error.message, error: true});
    }
}

// 댓글을 작성하는 액션
export const addComment = (recuritId, commentInfo) => async (dispatch) => {
    dispatch({type: ADD_COMMENT_REQUEST});
    try {
        const response = await addCommentRequest(recuritId, commentInfo);
        dispatch({type: ADD_COMMENT_SUCCESS, payload: response});
    } catch (error) {
        dispatch({type: ADD_COMMENT_FAILURE, payload: error.message, error: true});
    }
}

// 댓글을 삭제하는 액션
export const deleteComment = (commentId) => async (dispatch) => {
    dispatch({type: DELETE_COMMENT_REQUEST});
    try {
        const response = await deleteCommentRequest(commentId);
        dispatch({type: DELETE_COMMENT_SUCCESS, payload: response});
    } catch (error) {
        dispatch({type: DELETE_COMMENT_FAILURE, payload: error.message, error: true});
    }
}

// 대댓글을 작성하는 액션
export const addReply = (parentId, replyInfo) => async (dispatch) => {
    dispatch({type: ADD_REPLY_REQUEST});
    try {
        const response = await addReplyRequest(parentId, replyInfo);
        dispatch({type: ADD_REPLY_SUCCESS, payload: response});
    } catch (error) {
        dispatch({type: ADD_REPLY_FALIURE, payload: error.message, error: true});
    }
}

// 대댓글을 삭제하는 액션
export const deleteReply = (childId) => async (dispatch) => {
    dispatch({type: DELETE_REPLY_REQUEST});
    try {
        const response = await deleteReplyRequest(childId);
        dispatch({type: DELETE_REPLY_SUCCESS, payload: response});
    } catch (error) {
        dispatch({type: DELETE_REPLY_FAILURE, payload: error.message, error: true});
    }
}
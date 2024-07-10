import { createNoticeAPI, deleteNoticeAPI, getNoticeListAPI } from "../api/NoticeAPI";

const GET_NOTICE_REQUEST = "GET_NOTICE_REQUEST";
const GET_NOTICE_SUCCESS = "GET_NOTICE_SUCCESS";
const GET_NOTICE_FAILURE = "GET_NOTICE_FAILURE";

const CREATE_NOTICE_REQUEST = "CREATE_NOTICE_REQUEST";
const CREATE_NOTICE_SUCCESS = "CREATE_NOTICE_SUCCESS";
const CREATE_NOTICE_FAILURE = "CREATE_NOTICE_FAILURE";

const DELETE_NOTICE_REQUEST = "DELETE_NOTICE_REQUEST";
const DELETE_NOTICE_SUCCESS = "DELETE_NOTICE_SUCCESS";
const DELETE_NOTICE_FAILURE = "DELETE_NOTICE_FAILURE";

// 공지글 리스트를 불러오는 액션
export const getNotices = (studyId) => async (dispatch) => {
    dispatch({ type: GET_NOTICE_REQUEST });
    try {
        const response = await getNoticeListAPI(studyId);
        dispatch({
            type: GET_NOTICE_SUCCESS,
            payload: response,
        });
    } catch (error) {
        console.log("게시물 목록을 가져오는데 실패했습니다.", error);
        dispatch({
            type: GET_NOTICE_FAILURE,
            payload: error.message || "게시물 목록을 가져오는데 실패함",
        });
    }
};

// 공지글 생성 액션
export const createNotice = (inputData, studyId) => async (dispatch) => {
    dispatch({ type: CREATE_NOTICE_REQUEST });
    try {
        const response = await createNoticeAPI(inputData, studyId);
        dispatch({ type: CREATE_NOTICE_SUCCESS, payload: response });
    } catch (error) {
        dispatch({
            type: CREATE_NOTICE_FAILURE,
            payload: error.message || "게시물 생성에 실패하였습니다.",
        });
    }
};

// 공지글 삭제 액션
export const deleteNotice = (id) => async (dispatch) => {
    dispatch({ type: DELETE_NOTICE_REQUEST });
    try {
        await deleteNoticeAPI(id);
        dispatch({
            type: DELETE_NOTICE_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_NOTICE_FAILURE,
            payload: error.message || "게시물을 삭제하는데 실패했습니다.",
        });
    }
};

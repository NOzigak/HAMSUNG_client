import { createBoardRequest, deleteBoardRequest, getBoardsRequest, updateBoardRequest } from "../api/BoardAPI";

const GET_BOARD_REQUEST = "GET_BOARD_REQUEST";
const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";
const GET_BOARD_FAILURE = "GET_BOARD_FAILURE";

const CREATE_BOARD_REQUEST = "CREATE_BOARD_REQUEST";
const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
const CREATE_BOARD_FAILURE = "CREATE_BOARD_FAILURE";

const UPDATE_BOARD_REQUEST = "UPDATE_BOARD_REQUEST";
const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
const UPDATE_BOARD_FAILURE = "UPDATE_BOARD_FAILURE";

const DELETE_BOARD_REQUEST = "DELETE_BOARD_REQUEST";
const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS";
const DELETE_BOARD_FAILURE = "DELETE_BOARD_FAILURE";

// 모집글 리스트를 불러오는 액션
export const getBoards = () => async (dispatch) => {
    dispatch({type: GET_BOARD_REQUEST});
    try{
        const response = await getBoardsRequest();
        const data = await response
        dispatch({
            type: GET_BOARD_SUCCESS,
            payload: data,
        })
    } catch (error) {
        console.log("게시물 목록을 가져오는데 실패했습니다.", error);
        dispatch({
            type: GET_BOARD_FAILURE,
            payload: error.message || "게시물 목록을 가져오는데 실패함"
        })
    }
}

// 모집글 생성 액션
export const createBoardAPI = (inputData) => async (dispatch) => {
    try{
        dispatch({type: CREATE_BOARD_REQUEST});
        const response = await createBoardRequest(inputData);
        dispatch({type: CREATE_BOARD_SUCCESS, payload: response});
    } catch (error) {
        dispatch({
            type: CREATE_BOARD_FAILURE,
            payload: error.message || "게시물 생성에 실패하였습니다.",
        });
    }
}

// 모집글 수정 액션
export const updateBoardAPI = (id, inputData) => async (dispatch) => {
    try{
        dispatch({type: UPDATE_BOARD_REQUEST});
        const response = await updateBoardRequest(id, inputData);
        dispatch({
            type: UPDATE_BOARD_SUCCESS,
            payload: {id: id, updatedData: response},
        });
    } catch (error) {
        dispatch({
            type: UPDATE_BOARD_FAILURE,
            payload: error.message || "게시물 수정에 실패했습니다.",
        });
    }
}

// 모집글 삭제 액션
export const deleteBoardAPI = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_BOARD_REQUEST});
        await deleteBoardRequest(id);
        dispatch({
            type: DELETE_BOARD_SUCCESS,
            payload: id,
        })
    } catch (error) {
        dispatch({
            type: DELETE_BOARD_FAILURE,
            payload: error.message || "게시물을 삭제하는데 실패했습니다.",
        })
    }
}
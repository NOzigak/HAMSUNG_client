import { v4 as uuidv4 } from "uuid";

const ADD_COMMENT = 'ADD_COMMENT';
//const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

const ADD_REPLY = 'ADD_REPLY';
//const EDIT_REPLY = 'EDIT_REPLY';
const DELETE_REPLY = 'DELETE_REPLY';

export const addComment = (boardId, text) => ({
    type: ADD_COMMENT,
    payload: {
        id: uuidv4(), // api 연결한 후에는 삭제
        board_id: boardId, 
        username: "sungkyun",
        text: text,
        modifiedDate: new Date().getTime(),
        childs:[]
    }
})

export const addReply = (text, parentId) => ({
    type: ADD_REPLY,
    payload: {
        id: uuidv4(),
        username: "sungkyun",
        text: text,
        modifiedDate: new Date().getTime(),
        parent_id: parentId,
    }
})

export const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    payload: {
        id,
    }
})

export const deleteReply = (parent_id, id) => ({
    type: DELETE_REPLY,
    payload: {
        parent_id,
        id,
    }
})
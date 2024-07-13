import { v4 as uuidv4 } from "uuid"; // 백엔드 연결 전 게시물 고유 id 부여를 위해 사용

const CREATE_NOTICE = "NOTICE/CREATE";
const DELETE_NOTICE = "NOTICE/DELETE";


export const createNotice = (props) => ({
    type: CREATE_NOTICE,
    payload: {
        id : uuidv4(), //고유한 id 생성
        created_at: new Date().getTime(),
        writer: "노성균", // 유저 닉네임 정보를 가져와야 함
        title: props.title,
        description: props.description,
        place: props.place,
    }
})

export const deleteNotice = (postId) => ({
    type:DELETE_NOTICE,
    payload: {
        postId,
    }
})

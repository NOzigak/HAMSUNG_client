
const initialState = [
    {
        id : 1,
        category : "프로그래밍",
        writer : "홍길동",
        title : "랙트고",
        description : "랙트고 리액트 심화 스터디 진행할 예정입니다. 많은 지원 부탁드립니다.",
        place : "서울",
        isRecruit : true,
        created_at : new Date("2024-06-01").getTime(),
        view : 45,
        capacity : 3
    },
    {
        id : 2,
        category : "어학",
        writer : "아무개1",
        title : "지각하지 말자",
        description: "취업을 위한 오픽스터디 모집하려고 합니다. 부지런하게 참여하실분 환영입니다!",
        place : "서울",
        isRecruit : false,
        created_at : new Date("2024-06-02").getTime(),
        view : 44,
        capacity : 5
    },
    {
        id : 3,
        category : "고시",
        writer : "홍길동",
        title : "노지각",
        description : "시험 꼭 합격합시다!",
        place : "서울",
        isRecruit : true,
        created_at : new Date("2024-06-01").getTime(),
        view : 43,
        capacity : 4
    },
  ]

const BoardReducer = (state = initialState, action) => {
    switch(action.type){
        case "BOARD/CREATE":
            return [action.payload, ...state]
        case "BOARD/UPDATE":
            return state.map((item) => String(item.id) === String(action.payload.id) ? action.payload : item)
        case "BOARD/DELETE":
            return state.filter((item) => String(item.id) !== String(action.payload.id))
        default:
            return state;
    }
}



export default BoardReducer;
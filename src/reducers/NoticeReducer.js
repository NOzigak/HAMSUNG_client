
const initialState = [
    {
        id : 1,
        writer : "노성균",
        title : "<필독> 함성 면접 스터디 기본 규칙 설명",
        description : "면접스터디 기본 규칙입니다.",
        created_at : new Date("2024-06-01").getTime(),
    },
    {
        id : 2,
        writer : "노성균",
        title : "스터디 장소 및 5월 스터디 일정 안내합니다.",
        description: "스터디 장소는 충무로입니다. 5월 일정 참고해주세요.",
        created_at : new Date("2024-06-02").getTime(),
    },
    {
        id : 3,
        writer : "노성균",
        title : "스터디 요일 및 장소 투표",
        description : "스터디 요일 및 장소를 투표해주세요.",
        created_at : new Date("2024-07-01").getTime(),
    },
    {
        id : 4,
        writer : "노성균",
        title : "1주차 스터디는 비대면으로 진행됩니다.",
        description : "1주차 스터디는 줌으로 진행하겠습니다. 시간 맞춰 참석 부탁드립니다.",
        created_at : new Date("2024-06-01").getTime(),
    }
  ]

const NoticeReducer = (state = initialState, action) => {
    switch(action.type){
        case "NOTICE/CREATE":
            return [action.payload, ...state]
        case "NOTICE/UPDATE":
            return state.map((item) => String(item.id) === String(action.payload.id) ? action.payload : item)
        case "NOTICE/DELETE":
            return state.filter((item) => String(item.id) !== String(action.payload.id))
        default:
            return state;
    }
}

export default NoticeReducer;
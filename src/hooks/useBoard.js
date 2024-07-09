import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useBoard = (id) => { // 모집글 상세정보를 요청하는 훅으로 변경예정.
    const data = useSelector(state => state.boards); // api연동시 삭제
    const [curBoardItem, setCurBoardItem] = useState();
    const nav = useNavigate();


    useEffect(() => {
        const currentBoardItem = data.find(
            (item) => String(item.id) === String(id)
        ) // 모든 게시물 중 params의 id 값과 일치하는 값 반환
        if(!currentBoardItem){
            window.alert("잘못된 요청입니다.")
            nav("/home", {replace: true});
        }

        setCurBoardItem(currentBoardItem);
    }, [id, data]);
    return curBoardItem;
};

export default useBoard;
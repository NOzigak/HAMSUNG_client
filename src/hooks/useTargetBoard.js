import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTargetBoard } from "../api/BoardAPI";

const useTargetBoard = (id) => {
    const [curBoardItem, setCurBoardItem] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTargetBoard(id);
                setCurBoardItem(response); // API에서 받아온 데이터 설정
                
            } catch (error) {
                console.error("게시글 조회 오류:", error);
                nav("/home", { replace: true });
            }
        };

        fetchData();
    }, [id, nav]);

    return curBoardItem;
};

export default useTargetBoard;

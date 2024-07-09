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
                if (response.status === 200) {
                    setCurBoardItem(response.data); // API에서 받아온 데이터 설정
                } else {
                    throw new Error("게시글을 찾을 수 없습니다.");
                }
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

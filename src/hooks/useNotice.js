import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTargetNotice } from "../api/NoticeAPI";

const useNotice = (id) => {
    const [noticeItem, setNoticeItem] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const fetchNoticeData = async () => {
            try {
                const response = await getTargetNotice (id);
                setNoticeItem(response); // API에서 받아온 데이터 설정
                
            } catch (error) {
                console.error("게시글 조회 오류:", error);
                nav("/home", { replace: true });
            }
        };

        fetchNoticeData();
    }, [id, nav]);

    return noticeItem;
};

export default useNotice;

import { useEffect, useState } from "react";
import RankItem from "./RankItem";
import "./Ranking.css";
import { getRank } from "../../api/RankAPI";


const Ranking = () => {

    const [studyRanking, setStudyRanking] = useState([]);
    useEffect(() => {
        fetchRank();
    }, []);
    const fetchRank = async () => {
        try{
            const response = await getRank();
            const rankedData = response.map((item, index) => ({
                ...item,
                rank: index + 1, // 1순위부터 시작
            }))
            setStudyRanking(rankedData);
        } catch(error) {
            console.log("랭크조회 실패", error);
        }
    }

    // 백엔드에서 순위 정렬을 처리해준다면 삭제할 코드
    console.log(studyRanking)
    return (
        <div className="rankWrapper">
            <div className="rankTop"/>
            <div className="rankRow">
                <div className="rankHeaderBasic">순위</div>
                <div className="rankHeaderTitle">스터디 이름</div>
                <div className="rankHeaderBasic">점수</div>
            </div>
            {studyRanking.map((item)=><RankItem key={item.id} {...item} />)}

        </div>
    )
}

export default Ranking;
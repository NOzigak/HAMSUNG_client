import { useEffect, useState } from "react";
import Applicant from "./Applicant";
import "./RecruitModal.css";
import { getApplicants } from "../../api/BoardAPI";


const RecruitModal = ({setModalOpen, boardId}) => {
    const recruitData = [
        {
            user_id : "123e4567-e89b-12d3-a456-426614174000",
            nickname: "신청자1",
            review: {
                "review_id":1,
                "noLate": 0,
                "faithful": 0,
                "kind": 3,
                "unkind": 2,
                "fastAnswer": 0,
                "slowAnswer":0,
                "passive": 0,
                "absent":0
            }
        },
        {
            user_id : "123e4567-e89b-12d3-a456-426614174001",
            nickname: "신청자2",
            review: {
                "review_id":1,
                "noLate": 0,
                "faithful": 0,
                "kind": 11,
                "unkind": 2,
                "fastAnswer": 0,
                "slowAnswer":10,
                "passive": 0,
                "absent":0
            }
        },
        {
            user_id : "123e4567-e89b-12d3-a456-426614174002",
            nickname: "신청자3",
            review: {
                "review_id":1,
                "noLate": 0,
                "faithful": 0,
                "kind": 3,
                "unkind": 2,
                "fastAnswer": 0,
                "slowAnswer":5,
                "passive": 0,
                "absent":0
            }
        },
        {
            user_id : "123e4567-e89b-12d3-a456-426614174003",
            nickname: "신청자4",
            review: {
                "review_id":1,
                "noLate": 0,
                "faithful": 0,
                "kind": 3,
                "unkind": 10,
                "fastAnswer": 0,
                "slowAnswer":5,
                "passive": 0,
                "absent":0
            }
        }

    ]
    const [applicantData, setApplicantData] = useState([]); // recruitData 대체

    // 신청자 리스트 불러오는 api 주석으로 미리 구현해 놓기..
    useEffect(()=> {
        const fetchApplicants = async () => {
            try{
                const applicants = await getApplicants(boardId);
                setApplicantData(applicants);
            } catch (error) {
                console.log("신청자 정보를 불러오는데 실패함", error);
            }
        };

        fetchApplicants();
    }, []); // 빈 배열로 두어 한 번만 호출되도록 설정

    const closeRecruit = (e) => {
        setModalOpen(false);
        e.preventDefault();
    }

    return (
        <div className="recruitWrapper">
            <div className="recruitTitle">
                <p>신청자 목록</p>
            </div>
            <div className="applicants">
                {recruitData.map((item) => <Applicant key={item.user_id} {...item} />)}
            </div>
            <div className="recruitClose">
                <button className="recruitCloseBtn" onClick={closeRecruit}>확인</button>
            </div>
        </div>
    )
}

export default RecruitModal;
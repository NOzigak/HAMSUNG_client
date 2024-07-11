import { useEffect, useState } from "react";
import Applicant from "./Applicant";
import "./RecruitModal.css";
import { getApplicants } from "../../api/BoardAPI";


const RecruitModal = ({setModalOpen, boardId}) => {

    const [applicantData, setApplicantData] = useState([]); // recruitData 대체

    // 신청자 리스트 불러오는 api 주석으로 미리 구현해 놓기..
    useEffect(()=> {
        const fetchApplicants = async () => {
            try{
                const applicants = await getApplicants(boardId);
                setApplicantData(applicants);
                console.log(applicantData)
                console.log("신청자 정보 가져오기 성공", applicants);
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
                {applicantData.map((item) => <Applicant key={item.id} study_id={boardId} member_id={item.id} {...item} />)}
            </div>
            <div className="recruitClose">
                <button className="recruitCloseBtn" onClick={closeRecruit}>확인</button>
            </div>
        </div>
    )
}

export default RecruitModal;
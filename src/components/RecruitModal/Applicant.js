import { findMaxReview } from "../../utils/findMaxReview";
import "./Applicant.css";
import applicant from "./../../assets/applicant.png";
import { approveMember } from "../../api/BoardAPI";
import getUserInfo from "../../utils/get-userInfo";
import { useState } from "react";

const Applicant = ({nickname, review, user_id}) => {
    
    //const writer = getUserInfo();
    const [isAdded, setIsAdded] = useState(false);
    const tag = findMaxReview(review);

    const onClickAdd = async () => {
        if(
            window.confirm("멤버에 추가하시겠습니까?")
        ){
            try {
                // const response = await approveMember(user_id, writer.id);
                // console.log("멤버 추가되었습니다.", response);
                setIsAdded(true);
            } catch (error) {
                console.log("멤버 승인에 실패했습니다.", error);
            } 
        }

    }

    return (
        <div className="applicantWrapper">
            <div className="applicantName">
                <p>{nickname}</p>
            </div>
            <div className="userMaxTag">
                {tag.review_type} 
                <div className="tagImg">
                    <img src={applicant} className="applicantImg" alt=""/>
                </div>
                {tag.count}
            </div>
            <div className="addMember">
                {!isAdded ? <button className="addMemberBtn" onClick={onClickAdd}>멤버 추가</button> :
                <button className="addMemberBtn">추가됨</button>
                }
            </div>
        </div>
    )
}

export default Applicant;
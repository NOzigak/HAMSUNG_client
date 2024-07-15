import { useEffect, useState } from "react";
import "../BoardEdit/BoardEdit.css";
import "./NoticeEdit.css"
import { useNavigate } from "react-router-dom";

export default function NoticeEdit({name,studyId,initData,onSubmit}){

    const [inputData, setInputData] = useState({
        title : "",
        place : "",
        description : "",
        study_id: studyId,
        type: "announcement"
    })
    const nav = useNavigate();

    useEffect(()=>{
        if(initData){
            console.log(inputData);
            setInputData(initData);
        }
    },[initData])

    const handleinputData = (e) => {
        const {name, value} = e.target
        setInputData({
            ...inputData,
            [name] : value
        })
    }

    const cancelEditNotice = () => {
        nav("/noticeList")
    }

    const onClickNoticeSubmit = () => {
        onSubmit(inputData);
    }

    return (
        <div className="boardWrapper">
            <div className="titleWrapper">
                <div className="boardTitle">
                    <h1>새 공지사항 {name}</h1> 
                </div> 
            </div>
            <div className="boardInput">
                <div>
                    제목 : <input className="noticeName" name="title" value={inputData.title} onChange={handleinputData}/>
                </div>

                <div>
                    장소 : <input className="noticePlace" name="place" value={inputData.place} onChange={handleinputData}/>
                </div>
                
                <div className="descWrapper">
                    내용 : <textarea className="noticeDescription" name="description" placeholder="공지사항을 작성해주세요." value={inputData.description} onChange={handleinputData}/>
                </div>   
            </div>
            <div className="btnSection"> 
                <button className="createBtn" onClick={onClickNoticeSubmit}>생성</button>
                <button className="cancleBtn" onClick={cancelEditNotice}>취소</button>
            </div>
        </div>
    )
}

import { useEffect, useState } from "react";
import "./BoardEdit.css";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utils/get-userInfo";

export default function BoardEdit({name, initData, onSubmit, mode}){
    //mode는 생성, 수정에 맞는 api를 호출해 사용하는데 이용된다.
    const selectList = ["어학","취업", "고시", "프로그래밍", "기타"]
    const userInfo = getUserInfo(); // jwt토큰 디코드해 id 가져오기
    const [inputData, setInputData] = useState({
        title : "",
        user_id: userInfo.id,
        description : "",
        category : "어학",
        place : "",
        capacity : 1,
    })
    const nav = useNavigate();

    useEffect(()=>{
        if(initData){
            setInputData(initData);
        }
       //console.log(inputData)
    },[initData])

    const handleinputData = (e) => {
        const {name, value} = e.target
        setInputData({
            ...inputData,
            [name] : value
        })
    }

    const cancleEdit = () => {
        nav("/")
    }

    const onClickSubmit = () => { //여기서 mode에 따른 작업을 처리한다.
        //onSubmit(inputData);
        if (mode === "생성") {
            onSubmit(inputData);
        } else if (mode ==="수정") {
            onSubmit(inputData.id, inputData);
        }
    }
    return (
        <div className="boardWrapper">
            <div className="titleWrapper">
                <div className="boardTitle">
                    <h1>스터디 {name}하기</h1> 
                </div> 
            </div>
            <div className="boardInput">
                <div>
                    스터디명 : <input className="studyName" name="title" value={inputData.title} onChange={handleinputData}/>
                </div>
                <div>
                    스터디 인원 : <input className="capacity" name="capacity" value={inputData.capacity} type="number" onChange={handleinputData}/>
                </div>
                <div>
                    스터디 종류 : <select className="studyCategory" name="category" onChange={handleinputData} >
                        {selectList.map((item) => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                </select>
                </div>
                <div>
                    스터디 장소 : <input className="place" type="text" name="place" value={inputData.place} onChange={handleinputData}/>
                </div>
                <div className="descWrapper">
                    스터디 소개 : <textarea className="description" name="description" placeholder="스터디를 설명해주세요." value={inputData.description} onChange={handleinputData}/>
                </div>   
            </div>
            <div className="btnSection">
                <button className="createBtn" onClick={onClickSubmit}>{mode === "생성" ? "생성" : "수정"}</button>
                <button className="cancleBtn" onClick={cancleEdit}>취소</button>
            </div>
        </div>
    )
}

//스터디명, 인원, 종류, 스터디 장소, 스터디 소개 =>생성 or 취소

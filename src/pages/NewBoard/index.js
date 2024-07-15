
import { useDispatch } from "react-redux";
import { Navbar } from "../../components/Navbar/Navbar";
import BoardEdit from "../../components/BoardEdit/BoardEdit";
import { useNavigate } from "react-router-dom";
import { createBoardAPI } from "../../actions/boardAction";

const NewBoard = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const onClickSubmitBtn = async (input) => {
        console.log("create this : ", input)
        dispatch(createBoardAPI(input)); // 함수명 뒤에 API붙이면 redux-thunk로 api요청
        nav("/", {replace : true});
    }

    return(
        <div>
            <Navbar />
            <BoardEdit name="생성" onSubmit={onClickSubmitBtn} mode="생성"/>
        </div>
    )
}

export default NewBoard;
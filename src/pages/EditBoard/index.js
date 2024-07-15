import { useNavigate, useParams } from "react-router-dom";
import BoardEdit from "../../components/BoardEdit/BoardEdit";
import { Navbar } from "../../components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import useTargetBoard from "../../hooks/useTargetBoard";
import { updateBoardAPI } from "../../actions/boardAction";


const EditBoard = () => {
    const params = useParams();
    const nav = useNavigate();
    const curBoardItem = useTargetBoard(params.id); // useTargetBoard 사용하면 api요청해 실제 상세 정보를 가져옴.
    const dispatch = useDispatch();

    const onSubmit = (id, input) => {
        if(window.confirm("내용을 수정할까요?")){
            dispatch(updateBoardAPI(id, input)); // 함수명 뒤에 API붙이면 redux-thunk액션
            nav('/', {replace: true});
        }
    }

    return(
        <div>
            <Navbar />
            <BoardEdit initData={curBoardItem} onSubmit={onSubmit} name="수정" mode="수정"/>
        </div>
    )
}

export default EditBoard;
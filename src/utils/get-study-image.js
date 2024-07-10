
import studyLang from "./../assets/studyLang.jpg";
import programming from "./../assets/programming.jpg";
import employmentStudy from "./../assets/employmentStudy.jpg";
import exam from "./../assets/exam.jpg";
import anything from "./../assets/anything.jpg";


export function getStudyImage(category){
    if(category === "어학"){
        return studyLang
    } else if (category === "프로그래밍" || category === "programming") {
        return programming
    } else if (category === "취업") {
        return employmentStudy
    } else if (category === "고시") {
        return exam
    } else if (category === "기타") {
        return anything
    }
}
import "./RankItem.css";

const RankItem = ({rank, title, score}) => {
    return (
        <div>
            <div className="rankItem">
                <div className="rank">
                    {rank}
                </div>
                <div className="rankStudyName">
                    {title}
                </div>
                <div className="rank">
                    {score}
                </div> 
            </div>
        </div>
    )
}

export default RankItem;
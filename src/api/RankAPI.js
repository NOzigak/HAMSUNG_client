import client from "./client"


export const getRank = async () => {
    try{
        const response = await client.get("/study/ranking");
        return response.data;
    } catch (error) {
        console.log("랭킹 조회 실패", error);
    }
}
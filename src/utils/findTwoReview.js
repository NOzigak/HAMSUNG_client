import { mapReview } from "./mapReview";

export function findTopTwoReviews(data) {
    const reviewCnts = {
        noLate: data.noLate || 0,
        faithful: data.faithful || 0,
        kind: data.kind || 0,
        unkind: data.unkind || 0,
        fastAnswer: data.fastAnswer || 0,
        slowAnswer: data.slowAnswer || 0,
        passive: data.passive || 0,
        absent: data.absent || 0
    };

    // 리뷰 개수를 배열 형태로 변환
    const reviewArray = Object.keys(reviewCnts).map(key => ({
        type: key,
        count: reviewCnts[key]
    }));

    // 리뷰 개수를 기준으로 내림차순 정렬
    reviewArray.sort((a, b) => b.count - a.count);

    // 상위 두 개의 리뷰를 선택
    const topTwoReviews = reviewArray.slice(0, 2);

    if (topTwoReviews.every(review => review.count === 0)) {
        return "리뷰가 없습니다.";
    }

    return topTwoReviews.map(review => ({
        review_type: mapReview(review.type),
        count: review.count
    }));
}

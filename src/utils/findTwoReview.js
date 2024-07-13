import { mapReview } from "./mapReview";

export function findTopTwoReviews(reviewResponseDto) {
    const reviewCnts = {
        noLate: reviewResponseDto.noLate || 0,
        faithful: reviewResponseDto.faithful || 0,
        kind: reviewResponseDto.kind || 0,
        unkind: reviewResponseDto.unkind || 0,
        fastAnswer: reviewResponseDto.fastAnswer || 0,
        slowAnswer: reviewResponseDto.slowAnswer || 0,
        passive: reviewResponseDto.passive || 0,
        absent: reviewResponseDto.absent || 0
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

    // 상위 두 개 리뷰가 모두 0일 경우 '리뷰가 없습니다' 반환
    if (topTwoReviews.every(review => review.count === 0)) {
        return "리뷰가 없습니다.";
    }

    // 리뷰가 있는 경우, 리뷰 타입을 매핑하고 반환
    return topTwoReviews.map(review => ({
        review_type: mapReview(review.type),
        count: review.count
    }));
}

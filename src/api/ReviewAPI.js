// api.js
export const submitReview = async (reviewData) => {
    try {
        const response = await fetch('/review/{user-id}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        const result = await response.json();

        if (response.ok) {
            return { status: response.status, message: result.message };
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

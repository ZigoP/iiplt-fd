export const postData = async (endpoint, body) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_DEVELOPMENT_V}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            const data = await response.json();
            return data
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Trade request failed');
        }
    } catch (error) {
        throw error
    }
}
export const getData = async (endpoint) => {
    return fetch(`${process.env.REACT_APP_DEVELOPMENT_V}/${endpoint}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    }).then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}
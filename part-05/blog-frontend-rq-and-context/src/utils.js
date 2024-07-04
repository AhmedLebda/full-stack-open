import { jwtDecode } from "jwt-decode";

let timeoutId = null;
export function sleep(ms = 2000) {
    return new Promise((resolve) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(resolve, ms);
    });
}

export function isJwtExpired(token) {
    // Decode the token
    const decodedToken = jwtDecode(token);

    // Check if token is expired
    const currentTimestamp = Date.now() / 1000;
    // Token is expired
    if (decodedToken.exp < currentTimestamp) {
        return true;
    }

    // token isn't expired
    return false;
}

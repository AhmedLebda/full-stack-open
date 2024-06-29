let timeoutId = null;
export function sleep(ms = 2000) {
    return new Promise((resolve) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(resolve, ms);
    });
}

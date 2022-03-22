// get species num with if/else for single and double digit numbers
export function getLastNum(url) {
    let end = url.lastIndexOf('/');
    let start = end - 2;

    if (url.charAt(start) === '/') { // single digit
        start++;
        return url.charAt(start);
    } else { // double digit
        let num = url.charAt(start);
        num += url.charAt(start + 1);
        return num;
    }
}

// clear grid of all previous figures
export function removeChildren(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
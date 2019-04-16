
// 用户信息存储在token里面
export const setCookie = (key, value, dateTime) => {
    // 默认设置一周后过期
    const date = new Date();
    const expiresDate = dateTime || date.setDate(date.getDate() + 7);
    const cookieValue = `${key}=${encodeURIComponent(value)};expires=${expiresDate}`;
    document.cookie = cookieValue;
}

export const getCookie = key => {
    let arr = document.cookie.split("; ");
    let value = "";
    arr.forEach(item => {
        const itemArr = item.split('=');
        if (itemArr[0] === key) {
            value = itemArr[1];
            return;
        }
    });
    return decodeURIComponent(value);
}

export const delCookie = key => {
    document.cookie = key + "=;expires=" + new Date(-1);
}

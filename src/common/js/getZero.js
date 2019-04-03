export default function (num) {
    let curNum = new String(num);
    let length = curNum.length - 1;
    let count = 0;
    let zeroStr = '';
    while(length-- > 0) {
        curNum /= 10;
        count ++;
    }
    while(count--) {
        zeroStr += '0';
    }
    return zeroStr;
}

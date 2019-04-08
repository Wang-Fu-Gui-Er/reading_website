export default function (num, example) {
    let curNum = new String(num);
    let curInt = new String(num);
    let length = curNum.length - curInt.length;
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

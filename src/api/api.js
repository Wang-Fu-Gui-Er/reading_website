import fetch from '@/config/fetch'

// 获取图书首页
export const getSecSort = () => fetch('/category/homeSmallCategory');
export const getBook = param => fetch('/book/list/recommend', param);

// 分类页
export const getAllCategory = () => fetch('/category/getAllCategory');
export const getAllBooks = param => fetch('/book/list/all', param);

// 用户相关操作
export const sendVerifyCode = param => fetch('/user/verifyCode/send', param);
export const checkVerifyCode = param => fetch('user/verifyCode/check', param);
export const userRegister = param => fetch('/user/register', param, 'POST');
export const userLogin = param => fetch('/user/login', param, 'POST');
export const userFallback = param => fetch('/advice/add', param, 'POST');

// 用户界面
export const queryUserInfo = email => fetch('/user/getUserInfo', email);
export const updateUserInfo = userBaseInfoDO => fetch('/user/updateUserInfo', userBaseInfoDO, 'POST');
export const userHistory = param => fetch('/reading/history', param);
export const userShelf = param => fetch('/book/list/onShelf', param);
export const userNote = param => fetch('/notes/queryByUserId', param, 'POST');
export const delNote = param => fetch('/notes/del', param);
export const delCommand = param => fetch('/review/del', param);

// 获取图书详情
export const getBookDetail = param => fetch('/book/getBookInfo', param);
export const getAllChapter = param => fetch('/chapter/getAllChapter', param);
export const getBookGrade = param => fetch('/reading/getBookGrade', param);
export const getBookCommand = param => fetch('/review/query', param, 'POST');


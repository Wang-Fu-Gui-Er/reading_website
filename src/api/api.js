import fetch from '../config/fetch'

/**
 * 获取图书首页
 */

export const getSecSort = () => fetch('/category/homeSmallCategory');
export const getBook = param => fetch('/book/list/recommend', param);

// 分类页
export const getAllCategory = () => fetch('/category/getAllCategory');

// 用户相关操作
export const sendVerifyCode = param => fetch('/user/verifyCode/send', param);
export const checkVerifyCode = param => fetch('user/verifyCode/check', param);
export const userRegister = param => fetch('/user/register', param, 'POST');
export const userLogin = param => fetch('/user/login', param, 'POST');

// 获取图书详情
export const getBookDetail = param => fetch('/book/getBookInfo', param);
export const getAllChapter = param => fetch('/chapter/getAllChapter', param);
export const getBookGrade = param => fetch('/reading/getBookGrade', param);


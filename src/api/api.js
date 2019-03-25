import fetch from '../config/fetch'

/**
 * 获取图书首页二级分类
 */

export const getSecSort = () => fetch('/category/homeSmallCategory');
export const getBook = param => fetch('/book/list/recommend', param);
export const getAllCategory = () => fetch('/category/getAllCategory');
export const sendVerifyCode = (param) => fetch('/user/verifyCode/send', param);
export const checkVerifyCode = param => fetch('user/verifyCode/check', param);
export const userRegister = param => fetch('/user/register', param, 'POST');
import fetch from '../config/fetch'

/**
 * 获取图书首页二级分类
 */

export const getSecSort = () => fetch('/category/homeSmallCategory');
export const getBook = param => fetch('/book/list/recommend', param);
export const getAllCategory = () => fetch('/category/getAllCategory');
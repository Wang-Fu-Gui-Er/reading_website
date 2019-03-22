import {getAllCategory} from '@/api/api';

export default async function(allCategory) {
    // let allCategory
    let curAllCategory = allCategory;
    if (curAllCategory.length > 0) {
        return curAllCategory;
    }
    // getAllCategory(res => {
    //     console.log(res);
    // })
    getAllCategory().then(res => {
        console.log(res);
        return res;
    })
    // curAllCategory = await getAllCategory();
    // return curAllCategory;
    // return allCategory.length > 0 ? allCategory : await getAllCategory();
}
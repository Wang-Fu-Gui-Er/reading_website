import {getAllCategory} from '@/api/api';

import {setStore, getStore} from '@/config/storage';

// import store from '@/store/';

export default async function() {
    const allCategory = await getAllCategory();
    setStore('allCategory', allCategory);
}

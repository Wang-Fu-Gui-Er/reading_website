
import { mapMutations } from "vuex";

import { setCookie } from '@/common/js/cookie';

export default {
    methods: {
        ...mapMutations(['UPDATE_USERINFO', 'CHANGE_USEREMAIL']),
        storageUserInfo(userInfo) {
            setCookie('userInfo', JSON.stringify(userInfo.userBaseInfo));
            setCookie('token', userInfo.token);
            this.UPDATE_USERINFO(userInfo.userBaseInfo);
            this.CHANGE_USEREMAIL(userInfo.userBaseInfo.email);
        }
    }
}

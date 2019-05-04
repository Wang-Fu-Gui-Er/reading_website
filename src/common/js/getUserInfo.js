
import { mapState, mapMutations } from 'vuex';
import { getCookie, delCookie } from './cookie';
import { queryUserInfo } from '@/api/api';

export default {
    computed: {
        ...mapState(['userInfo', 'userEmail']),
    },
    methods: {
        ...mapMutations(['UPDATE_USERINFO', 'CHANGE_USEREMAIL']),
        getUserInfo() {
            let userInfo = this.userInfo;
            if (Object.keys(userInfo).length === 0) {
                userInfo = getCookie('userInfo') && JSON.parse(getCookie('userInfo'));
                if (!userInfo) {
                    this.getFromApi();
                    userInfo = this.userInfo;
                }
                else {
                    this.UPDATE_USERINFO(userInfo);
                }
            }
            return userInfo;
        },
        async getFromApi() {
            const userEmail = this.userEmail;
            if (userEmail) {
                const userInfo = await queryUserInfo(this.userEmail);
                this.UPDATE_USERINFO(userInfo);
            }
            else {
                this.clearUserInfo();
            }
        },
        clearUserInfo() {
            delCookie('userInfo');
            this.UPDATE_USERINFO({});
            this.CHANGE_USEREMAIL('');
        }
    }
}

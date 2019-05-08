import { mapState, mapActions } from "vuex";

export default {
    computed: {
        ...mapState(['isOnShelf'])
    },
    methods: {
        ...mapActions(['getShelfStatus']),
        initShelf(userInfo, bookId) {
            if (this.isOnShelf === null) {
                if (Object.keys(userInfo).length > 0) {
                    this.getShelfStatus({
                        bookId,
                        userId: userInfo.id
                    });
                }
            }
        },
    }
}
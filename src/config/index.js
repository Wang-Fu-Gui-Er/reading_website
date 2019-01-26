import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/mainPage'
import MainPageContent from '@/components/mainPageContent';
import Sort from '@/components/sort.vue'
Vue.use(Router)

// TODO: 有个warnning
export default new Router({
    routes: [{
        path: '/',
        name: 'mainPage',
        component: MainPage,
        children: [
            // { path: '/:name', redirect: '/' },
            {
                path: '',
                component: MainPageContent
            },
            {
                path: '/sort',
                component: Sort
            }
        ]
    }]
})
import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Content from '@/components/main/Content';
import Sort from '@/components/main/Sort'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Main,
        default: 'mainPage',
        children: [
            // { path: '/:name', redirect: '/' },
            {
                path: '',
                name: 'mainPage',
                component: Content
            },
            {
                path: '/sort',
                component: Sort
            }
        ]
    }, {
        path: '*',
        redirect: {
            name: 'mainPage'
        }
    }]
})

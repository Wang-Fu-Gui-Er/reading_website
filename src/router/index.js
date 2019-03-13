import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main'
import Content from '@/components/main/Content';
import Sort from '@/components/main/Sort'
Vue.use(Router)

// TODO: 有个warnning
export default new Router({
    routes: [{
        path: '/',
        name: 'main',
        component: Main,
        children: [
            // { path: '/:name', redirect: '/' },
            {
                path: '',
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

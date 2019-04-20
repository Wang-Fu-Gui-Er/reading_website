import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Content from '@/components/main/Content';
import Sort from '@/components/main/Sort'
import Book from '@/components/book/Book'

import Shelf from '@/components/shelf/Shelf'
import Config from '@/components/shelf/content/Config';
import UserRead from '@/components/shelf/content/UserRead';
import Note from '@/components/shelf/content/Note'

import Manage from '@/components/manage/Manage';
import BookManage from '@/components/manage/content/bookManage/BookManage';
import EditBook from '@/components/manage/content/bookManage/EditBook';

import Search from '@/components/search/Search';


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Main,
        default: 'mainPage',
        children: [
            {
                path: '',
                name: 'mainPage',
                component: Content
            },
            {
                path: '/sort',
                name: 'sort',
                component: Sort
            },
            {
                path: '/book',
                name: 'book',
                component: Book
            },
            {
                path: '/shelf',
                component: Shelf,
                default: 'config',
                children: [{
                    path: '',
                    name: 'config',
                    component: Config
                }, {
                    path: '/histroy',
                    name: 'history',
                    component: UserRead
                }, {
                    path: '/myBook',
                    name: 'myBook',
                    component: UserRead
                }, {
                    path: '/note',
                    name: 'note',
                    component: Note
                }, {
                    path: '/command',
                    name: 'command',
                    component: Note
                }]
            },
            {
                path: '/manage',
                component: Manage,
                children: [{
                    path: '',
                    component: BookManage,
                    name: 'manage'
                }, {
                    path: 'edit',
                    component: EditBook,
                    name: 'edit'
                }]
            },
            {
                path: '/search',
                component: Search,
                name: 'search'
            }
        ]
    }, {
        path: '*',
        redirect: {
            name: 'mainPage'
        }
    }]
})

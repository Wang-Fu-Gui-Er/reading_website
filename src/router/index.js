import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Content from '@/components/client/main/Content';
import Sort from '@/components/client/main/Sort'
import Book from '@/components/client/book/Book'

import Read from '@/components/client/read/Read';

import Shelf from '@/components/client/shelf/Shelf'
import Config from '@/components/client/shelf/content/Config';
import UserRead from '@/components/client/shelf/content/UserRead';
import Note from '@/components/client/shelf/content/Note'

import Search from '@/components/client/search/Search';

import Manage from '@/components/manage/Manage';
import BookManage from '@/components/manage/content/bookManage/BookManage';
import EditBook from '@/components/manage/content/bookManage/EditBook';
import EditChapter from '@/components/manage/content/bookManage/EditChapter';

import AuthorManage from '@/components/manage/content/authorManage/AuthorManage';
import EditAuthor from '@/components/manage/content/authorManage/EditAuthor';
import FallbackManage from '@/components/manage/content/fallbackManage/FallbackManage';

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
                path: 'sort',
                name: 'sort',
                component: Sort
            },
            {
                path: 'book',
                name: 'book',
                component: Book
            },
            {
                path: 'shelf',
                component: Shelf,
                default: 'config',
                children: [{
                    path: '',
                    name: 'config',
                    component: Config
                }, {
                    path: 'histroy',
                    name: 'history',
                    component: UserRead
                }, {
                    path: 'myBook',
                    name: 'myBook',
                    component: UserRead
                }, {
                    path: 'note',
                    name: 'note',
                    component: Note
                }, {
                    path: 'command',
                    name: 'command',
                    component: Note
                }]
            },
            {
                path: 'manage',
                component: Manage,
                children: [{
                    path: '',
                    component: BookManage,
                    name: 'bookManage'
                }, {
                    path: 'editBook',
                    component: EditBook,
                    name: 'editBook'
                }, {
                    path: 'editChapter',
                    component: EditChapter,
                    name: 'editChapter'
                }, {
                    path: 'author',
                    component: AuthorManage,
                    name: 'authorManage'
                }, {
                    path: 'editAuthor',
                    component: EditAuthor,
                    name: 'editAuthor'
                }, {
                    path: 'fallback',
                    component: FallbackManage,
                    name: 'fallbackManage'
                }]
            },
            {
                path: 'search',
                component: Search,
                name: 'search'
            }
        ]
    }, {
        path: '/read',
        name: 'read',
        component: Read
    }, {
        path: '*',
        redirect: {
            name: 'mainPage'
        }
    }]
})

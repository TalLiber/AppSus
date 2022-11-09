import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import keepPage from './apps/keep/pages/note-index.cmp.js'

import emailApp from './apps/mail/pages/email-app.cmp.js'
import emailList from './apps/mail/pages/email-list.cmp.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        component: homePage,
    },
    {
        path: '/about',
        component: aboutPage,
    },
    {
        path: '/mail',
        component: emailApp,
        name: 'email-app',
        children: [
            {
                path:'/mail/inbox',
                component:emailList
            }
        ]

    },
    {
        path: '/keep',
        component: keepPage,
    },
    ],
}

export const router = createRouter(routerOptions)
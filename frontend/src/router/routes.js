const routes =  [
    
    { 
        path: '/', 
        redirect: '/home',
        component: () => import('@layouts/DefaultLayout.vue'),
        children: [
            { path:'/home', name: 'home', component: () => import('@views/Home.vue')},
        ]
    },

    {
        path:'/auth',
        redirect: '/login',
        component: () => import('@layouts/DefaultLayout.vue'),
        meta: {guestsRoute: true},
        children: [
            { path: '/login', name: 'login', component: () => import('@views/Login.vue')},
            { path: '/registration', name: 'registration',  component: () => import('@views/Registration.vue')},
        ]
    },

    { 
        path: '/profile',
        // redirect: '/profile',
        meta:{ requiredAuth: true },
        component: () => import('@layouts/ProfileLayout.vue'),
        children: [
            {path: '/profile', name:'profile', component: () => import('@views/Profile.vue') },
        ]
    },

    { 
        path: '/:catchAll(.*)', 
        component: () => import('@views/NotFound.vue')
    }
]


export default routes
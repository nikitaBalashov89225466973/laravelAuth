    const publicRoutes = [
        {path: '/', redirect:'/home', component: () => import('@views/Home.vue')},
        {path: '/home', name: 'home', component: () => import('@views/Home.vue')},
    ]

    export default publicRoutes;

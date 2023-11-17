import { createRoutes } from '../castomFunctions'

const loginRoutes = createRoutes(
    { meta: {guestsRoute: true}, },
    [        
        { path: '/login', name: 'login', component: () => import('@views/Login.vue')},
        { path: '/registration', name: 'registration',  component: () => import('@views/Registration.vue')},
    ]
)

export default loginRoutes
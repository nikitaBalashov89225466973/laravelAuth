import { createRoutes } from '../castomFunctions'

const profileRoutes = createRoutes(
    { meta:{ requiredAuth: true }, },
    [        
        {path: '/profile', name:'profile', component: () => import('@views/Profile.vue') },
    ]
)

export default profileRoutes


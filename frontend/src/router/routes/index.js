import publicRoutes from './publicRoutes'
import loginRoutes from './loginRoutes'
import profileRoutes from './profileRoutes'
import notFoundRoute from './notFoundRoute'

const routes =  [
    
    ...publicRoutes,
    ...loginRoutes,
    ...profileRoutes,
    ...notFoundRoute
    
]


export default routes
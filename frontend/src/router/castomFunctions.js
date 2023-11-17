export function createRoutes(config, routes){
    if(config.prefix !== undefined) routes.forEach( route => { route.path = config.prefix + route.path } )
    if(config.meta !== undefined){
        const meta = config.meta
        routes.forEach( route => { route.meta = {...route.meta, ...meta } } )
    }
    return routes
}

// const exampleRoutes = createRoutes(
//     {
//         prefix: '/ass',
//         meta: {requiredAuth: true}
//     },
//     [
//         {path: '/hole', name: 'assHole', component: () => import('@views/AssHole.vue')}
//     ]
// )
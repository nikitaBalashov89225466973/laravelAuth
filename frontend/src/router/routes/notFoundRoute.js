const notFoundRoute = [ { path: '/:catchAll(.*)', component: () => import('@views/NotFound.vue')}]

export default notFoundRoute
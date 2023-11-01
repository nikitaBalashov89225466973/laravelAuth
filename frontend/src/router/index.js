import { createRouter, createWebHistory } from "vue-router";
import store from '../store'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((nextPage, currentPage, goTo)=>{
    console.log(nextPage.meta.requiredAuth && store.state.user.token === null)
    if(nextPage.meta.requiredAuth && store.state.user.token === null) goTo({name: "login"})
    else if(store.state.user.token && nextPage.meta.guestsRoute ) goTo({name: "profile"})
    else goTo()
})

export default router;
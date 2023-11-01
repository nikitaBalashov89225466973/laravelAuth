import { createStore } from "vuex";

import userStore from "./modules/userStore.js";

const store = createStore({  
    modules: {
        user: userStore
    }
})

export default store;
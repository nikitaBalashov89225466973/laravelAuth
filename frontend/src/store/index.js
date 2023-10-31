import { createStore } from "vuex";

import userModule from "./modules/userModule.js";

const store = createStore({  
    modules: {
        user: userModule
    }
})

export default store;
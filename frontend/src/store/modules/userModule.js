const userModule = {
    state: {
        data: {
            name:"ass", 
            email:"asd@asd"
        },
        token: 123
    },
    mutations: {},
    actions: {},
    getters: {
        isUserAuthenticated: state => { return !(state.token === null) },
        userData: state => { return state.data },
        
    }
}

export default userModule;
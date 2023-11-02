import API from '../../axios'

const userModule = {
    state: {
        data: {},
        token: sessionStorage.getItem('TOKEN')
    },
    mutations: {
        setUser: (state, userData) => {
            state.data.email = userData.email
            state.data.name = userData.name
            
        },
        setToken: (state, token) => {

            state.token = token

            sessionStorage.setItem('TOKEN', token)

        }
    },
    actions: {
        initUserStorage({commit}){
            if(sessionStorage.getItem('TOKEN') !== null){
                return API.post('/auth/me')
                    .then(({data}) => {
                        commit("setUser", data)
                        return data;
                    }) 
                    
            }
        },
        login({commit}, user){

            return API.post('/auth/login', user)
            .then(({data})=> {
                commit("setUser", data.user)
                commit("setToken", data.token.original.access_token)
                return data;
            })

        },
        register({commit}, user){

            return API.post('/auth/registrated', user)
            .then(({data})=> {
                commit("setUser", data.user)
                commit("setToken", data.token.original.access_token)
                return data;
            })
        },
        refreshToken({commit}, token){
            commit("setToken", token)
        }
    },
    getters: {
        isUserAuthenticated: state => { return !(state.token === null) },
        userData: state => { return state.data }, 
    }
}

export default userModule;
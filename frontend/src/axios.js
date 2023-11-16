import axios from "axios";
import store from "./store";
import router from '@/router/index'
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem('TOKEN')}` 
    return config
})

axiosClient.interceptors.response.use(

    config => { return config },

    error => {
        
        //checkout time live token method 
        if(error.response.data.message === 'Token has expired'){
            console.error('error', error.response.data.message)
            return axios.post('http://127.0.0.1:8000/api/auth/refresh', {}, {
                headers: {
                    'authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
                }

            }).then(res => {

                sessionStorage.setItem('TOKEN', res.data.access_token);
                store.dispatch('refreshToken',res.data.access_token )
                console.log('Token has been updated')

                error.config.headers.authorization = `Bearer ${sessionStorage.getItem('TOKEN')}`
                return axiosClient.request(error.config)
            })
            .catch( error => {
                if(error.response.data.message === 'The token has been blacklisted'){
                    console.error('error', 'The token has been blacklisted. Pleace login again.' )
                    store.dispatch('logout' )
                    router.push({name: 'login'})
                    throw error
                }
            })

        }

        //checkout token in not blacklinsted
            if(error.response.data.message === 'The token has been blacklisted'){
                console.error('error', 'The token has been blacklisted. Pleace login again.' )
                store.dispatch('logout' )
                router.push({name: 'login'})
                throw error
                }
        
        throw error
    }
)
export default axiosClient
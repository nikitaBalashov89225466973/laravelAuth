import axios from "axios";
import store from "./store";

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
        console.error('error', error.response.data.message)
        if(error.response.data.message === 'Token has expired'){

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
        }
    }
)
export default axiosClient
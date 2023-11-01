<template>
    <form @submit.prevent='login' class="w-1/2 m-auto">
        <h1 class='text-3xl text-center font-bold pb-5'>Login</h1>
       
        <MyInput :title="'Email'" class='mb-6' 
            :type="'email'"  :placeholder="'name@example.com'" 
            :error="formErrors.email !== undefined ? formErrors.email.shift() : '' "
            v-model="dataForm.email" :required="true"
        />
        <MyInput :title="'Password'" class='mb-6' 
            :type="'password'"  
            :error="formErrors.password !== undefined ? formErrors.password.shift() : '' "
            v-model="dataForm.password" :required="true"
        />

        <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800">
            </div>
            <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
        </div>
        
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

</template>

<script setup>
    import MyInput from '../components/UI/MyInput.vue'
    import {ref} from 'vue'
    import store from '../store';

    import {useRouter} from 'vue-router'
    const router = useRouter()

    const dataForm = {  email : '', password: '', }
    const formErrors = ref({})
    
    function login(){

        store.dispatch('login', dataForm)
            .then(()=>{
                    router.push({
                    name:'profile'
                })
            })
            .catch(({response}) =>{
                if( response !== undefined && response.status === 422) formErrors.value = response.data.errors
            })

    }
    
</script>
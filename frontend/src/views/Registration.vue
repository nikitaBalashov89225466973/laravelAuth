<template>
    <form @submit.prevent="register" class="w-1/2 m-auto">
        <h1 class='text-3xl text-center font-bold pb-5'>Registration</h1>

        <MyInput :title="'Name'" class='mb-6' 
            :type="'text'"  :placeholder="'You name'" 
            :error="form.getError('name')"
            v-model="form.data.name" :required="true"
        />

        <MyInput :title="'Email'" class='mb-6' 
            :type="'email'"  :placeholder="'Your email'" 
            :error="form.getError('email')"
            v-model="form.data.email" :required="true"
        />
        
        <MyInput :title="'Password'" class='mb-6' 
            :type="'password'"   
            :error="form.getError('password')"
            v-model="form.data.password" :required="true"
        />
        
        
        <MyInput :title="'Password confitmation'" class='mb-6' 
            :type="'password'"   
            :error="form.getError('password_confirmation')"
            v-model="form.data.password_confirmation" :required="true"
        />

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

</template>

<script setup>
    import {ref} from 'vue'
    import store from '../store';
    import MyInput from '@/components/UI/MyInput.vue'

    import {useRouter} from 'vue-router'
    const router = useRouter()

    const form = {
        data: {}, errors: ref({}),
        getError: function (nameError){
            return this.errors.value[nameError] !== undefined ? form.errors.value[nameError].shift() : '' 
        }
    }

    function register(){
        store.dispatch('register', form.data)
            .then(()=>{
                    router.push({
                    name:'profile'
                })
            })
            .catch(({response}) =>{
                if( response !== undefined && response.status === 422) form.errors.value = response.data.errors
            })
    }
</script>
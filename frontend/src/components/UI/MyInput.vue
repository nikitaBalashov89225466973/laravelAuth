<template>
    <div>

        <label :for="title" 
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            :class="error !== '' ?  'text-red-600' : '' "
        > 
            {{ props.title }}
        </label>

        <input  :value="modelValue" @input='(e) => {emits("update:modelValue", e.target.value)}' :type="type" :id="title" 
            class="bg-gray-50 border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            :class="error !== '' ?  'border-red-500 text-red-900 placeholder-red-500' :'border-gray-300 text-gray-900' "
            :placeholder="props.placeholder" :required="required" 
        > 

        <p v-if="error !== '' " class="mt-2 text-sm text-red-600 dark:text-red-500">{{ error }}</p>

    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        title: String,
        placeholder: String,
        type: String,
        title: String,
        error: String,
        required: Boolean,
        modelValue: String|Number
    });

    const emits = defineEmits(['update:modelValue']);

</script>
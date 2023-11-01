<script setup>
  import { onMounted } from 'vue';
  import store from './store';

  onMounted(async() => {
    store.dispatch('initUserStorage')
  })
</script>

<template>

  <router-view></router-view>
</template>

<style>
</style>

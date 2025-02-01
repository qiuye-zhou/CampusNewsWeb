<script setup lang="ts">
import RouterView from '../router-view.vue'
import Header from './Header.vue'
</script>
<template>
    <Header />
    <main class="ml-6">
        <RouterView />
    </main>
</template>

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './route'

export const router = createRouter({
    history: createWebHistory(),
    routes
})

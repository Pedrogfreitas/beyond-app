import Vue from 'vue'
import VueRouter from 'vue-router'

import Biblioteca from '@/pages/Biblioteca.vue'
import Calendario from '@/pages/Calendario.vue'
import Cursos from '@/pages/Cursos.vue'
import Forum from '@/pages/Forum.vue'
import UserCrud from '@/components/UserCrud.vue'

Vue.use(VueRouter)

const routes = [
    {
        path:'/Users',
        component: UserCrud
    },
    {
        path:'/Forum',
        component: Forum
    },
    {
        path:'/Calendario',
        component: Calendario
    },
    {
        path:'/Cursos',
        component: Cursos
    },
    {
        path:'/Biblioteca',
        component: Biblioteca
    },
]

const router = new VueRouter({
    routes
})

export default router
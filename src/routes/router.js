import Vue from 'vue'
import VueRouter from 'vue-router'
import Biblioteca from '@/pages/Biblioteca.vue'
import Calendario from '@/pages/Calendario.vue'
import Cursos from '@/pages/Cursos.vue'
import Forum from '@/pages/Forum.vue'
import Users from '@/pages/Users'
import Login from '@/pages/Login'
import Home from '@/pages/Home'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/Login'
    },
    {
        path: '/Home',
        component: Home
    },
    {
        path: '*',
        redirect: '/Home'
    },
    {
        path:'/Users',
        component: Users
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
    {
        path:'/Login',
        component: Login
    },
]

const router = new VueRouter({
    routes
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Biblioteca from '@/pages/Biblioteca.vue'
import Calendario from '@/pages/Calendario.vue'
import Cursos from '@/pages/Cursos.vue'
import Forum from '@/pages/Forum.vue'
import Users from '@/pages/Users'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import { auth } from '@/config/firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/Home'
    },
    {
        path: '/Home',
        component: Home,
    },
    {
        path: '*',
        redirect: '/Home'
    },
    {
        path:'/Users',
        component: Users,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/Forum',
        component: Forum,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/Calendario',
        component: Calendario,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/Cursos',
        component: Cursos,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/Biblioteca',
        component: Biblioteca,
        meta: {
            requiresAuth: true
        }
    },
    {
        path:'/Login',
        component: Login
    },
]

const router = new VueRouter({
    routes
})

    // eslint-disable-next-line no-unused-vars
const signOut = () => {
    auth.currentUser = null;
};

router.beforeEach((to, from, next) => {
    const requiresAuth= to.matched.some(record => record.meta.requiresAuth);
    console.log('currentUser', auth.currentUser);
    if (requiresAuth && !auth.currentUser) {
        next('/login');
    } else {
        next();
    }
})

export default router
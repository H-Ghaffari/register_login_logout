import {createRouter, createWebHistory} from "vue-router"
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/register.vue';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';
import Surveys from '../views/Surveys.vue'
import store from '../store';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: { requiresAuth : true},
        children : [
            { path: '/dashboard', name: 'Dashboard', component: Dashboard },
            { path: '/surveys', name: 'Surveys', component: Surveys }
        ]

    },
    {
        path: '/auth',
        redirect: '/login',
        component: AuthLayout,
        name: 'Auth',
        meta: {isGuest: true},
        children : [
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            }
        ]
    }
];

const router = createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && (!store.state.user.token)){
        next({name: 'Login'});
    // } else if (store.state.user.token && (to.name === 'Login' || to.name === 'register')){
    //     next({name: 'Dashboard'});
    // }
    } else if (store.state.user.token && to.meta.isGuest){
        next({name: 'Dashboard'});
    }
    else {
        next();
    }
})

export default router;
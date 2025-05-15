import Login from './Login.vue';
import AdminLogin from './AdminLogin.vue';

const AuthRoutes = [
    {
        //http://localhost:4005/Authentication/Login
        path: '/Authentication/Login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Authentication/AdminLogin',
        name: 'AdminLogin',
        component: AdminLogin,
    },
]

export default AuthRoutes;
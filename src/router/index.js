
import {createRouter,createWebHistory} from 'vue-router';



const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => { import('../App.vue') },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    // mode: 'history',
    // base: process.env.BASE_URL, //cpnfig.js里的publicpath
    routes
});

export default router;

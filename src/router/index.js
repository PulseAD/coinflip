import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import NewGame from '../views/NewGame.vue';
import Leaderboard from '../views/Leaderboard.vue';
import Contribute from '../views/Contribute.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard/:sessionId',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/new-game',
    name: 'NewGame',
    component: NewGame,
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard,
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: Contribute,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

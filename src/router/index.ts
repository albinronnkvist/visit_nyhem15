import { createWebHistory, createRouter } from 'vue-router'
import { auth } from '@/firebase/firebaseInit.js'
const NProgress = require('nprogress')

const routes = [
  {
    path: '/',
    name: 'start',
    component: () => import(/* webpackChunkName: 'start' */ '@/components/views/start/Start.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: 'about' */ '@/components/views/about/About.vue')
  },
  {
    path: '/find',
    name: 'find',
    component: () => import(/* webpackChunkName: 'find' */ '@/components/views/find/Find.vue')
  },
  {
    path: '/explore',
    name: 'explore',
    component: () => import(/* webpackChunkName: 'explore' */ '@/components/views/explore/Explore.vue')
  },
  {
    path: '/explore/:itemId',
    name: 'explore-item',
    component: () => import(/* webpackChunkName: 'explore-item' */ '@/components/views/explore/Item.vue')
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import(/* webpackChunkName: 'booking' */ '@/components/views/booking/Booking.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: 'contact' */ '@/components/views/contact/Contact.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/components/views/admin/Login.vue'),
    meta: {
      requiresGuest: true,
      hideFooter: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: 'admin' */ '@/components/views/admin/Admin.vue'),
    meta: {
      requiresAuth: true
    }
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: () => import(/* webpackChunkName: 'not-found' */ '@/components/views/NotFound.vue')
  }
];

interface To {
  hash: string;
}

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to: To) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    } else {
      return { left: 0, top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  NProgress.start()
  NProgress.set(0.1)
  next()
})
router.afterEach(() => {
  setTimeout(() => NProgress.done(), 500)
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!auth.currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    if(auth.currentUser) {
      next({
        path: '/admin',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;

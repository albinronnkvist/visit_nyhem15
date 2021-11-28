import { createApp } from 'vue'
import App from './App.vue'
require('@/styles/_main.scss')
require('@/styles/hover.css')
import router from './router'
import VueSmoothScroll from 'v-smooth-scroll'
import AOS from 'aos'
import i18n from './i18n/index'
import { fbApp, auth } from '@/firebase/firebaseInit.js'

declare module "@vue/runtime-dom" {
    interface ImgHTMLAttributes extends HTMLAttributes {
        loading?: "lazy" | "eager" | "auto";
    }
    interface IframeHTMLAttributes extends HTMLAttributes {
        loading?: "lazy" | "eager" | "auto";
    }
}

AOS.init()

let app: any;
auth.onAuthStateChanged(user => {
    if(!app) {
        app = createApp(App)
        app.use(router)
        app.use(i18n)
        app.use(VueSmoothScroll)
        app.mount('#app')
    }
})

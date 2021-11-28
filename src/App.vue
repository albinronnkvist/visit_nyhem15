<template>
  <div id="app">
    <Header @showNavValue="toggleBlurApp" />
    <nprogress-container />
    <div :class="{'blur-content': blurApp}">
      <router-view v-slot="{ Component }">
        <transition 
          name="route" 
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <Footer v-if="!$route.meta.hideFooter" />
      <BackToTopButton />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from './components/sections/Header.vue';
import Footer from './components/sections/Footer.vue'
import BackToTopButton from './components/other/BackToTopButton.vue'
const NprogressContainer = require('vue-nprogress/src/NprogressContainer')

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    BackToTopButton,
    NprogressContainer
  },

  setup() {
    let blurApp = ref<boolean>(false);

    let toggleBlurApp = (val: boolean) => {
      blurApp.value = val;
    }

    return { 
      blurApp, 
      toggleBlurApp
    }
  }
});
</script>

<style lang="scss">
#app {
  width: 100%;
  max-width: 100vw;
  overflow-wrap: break-word;
  overflow-x: hidden;
}

.blur-content{
  filter: blur(5px); 
  transition : filter .2s linear;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}

.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
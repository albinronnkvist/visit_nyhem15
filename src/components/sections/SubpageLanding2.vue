<template>
  <div class="has-background-light">
    <div 
      class="subpage-intro-container" 
      :class="{ 'push-up': $route.path == '/find' }"
      style="position: relative;"
    >
      <Map />
      <div class="wave" />
    </div>
  </div>
  <div class="subpage-intro-text">
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1 class="titled mt-0 mb-0 has-text-centered">
      {{ title }}
    </h1>
    <p class="has-text-centered mt-4">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import Breadcrumbs from "@/components/sections/Breadcrumbs.vue"
import Map from '../views/find/Map.vue'

interface Breadcrumbs {
  id: number,
  route: string,
  title: string,
  isLast: boolean
}

export default defineComponent({
  name: "SubpageLanding2",

  components: {
    Breadcrumbs,
    Map
  },

  props: {
    breadcrumbs: {
      type: Array as PropType<Array<Breadcrumbs>>,
      required: true
    },
    backgroundImage: {
      type: String,
      default: 'about/house-front.png',
      required: true
    },
    title: {
      type: String,
      default: 'Titel',
      required: true
    },
    text: {
      type: String,
      default: 'Text',
      required: true
    }
  },

  setup(props) {
    let backgroundImageURL = computed(() => {
      return require(`@/assets/${props.backgroundImage}`)
    })

    let backgroundImageStyle = computed(() => {
      return `backgroundImage: url(${backgroundImageURL.value})`
    })

    return {
      backgroundImageStyle
    }
  }
});
</script>

<style lang="scss" scoped>
.subpage-intro-container {
  width: 100vw;
  height: 70vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 90%;
  background-position-x: 25vh;
  background-position-y: -10vh;

  @include bp(mobile) {
    background-size: 100%;
    background-position-y: 5vh;
    height: 60vh;
    background-position-x: 0;
  }

  @include bp(tablet) {
    background-size: 110%;
    background-position-y: 0;
    background-position-x: 0;
  }
}

.push-up {
  background-position-y: -20vh;

  @include bp(mobile-and-tablet) {
    background-position-y: -10vh;
    background-position-x: -30vh;
  }
}

.subpage-intro-text {
  background-color: $main-color;
  color: #fff;
  min-height: 30vh;
  width: 100vw;
  padding-top: 3rem;
  padding-bottom: 2em;

  @include bp(mobile) {
    height: 40vh;
    padding-top: 4rem;
  }
}

.wave {
  position: absolute;
  height: 69px;
  width: 100%;
  background: transparent;
  bottom: 2%;
}

.wave::before {
  content: "";
  display: block;
  position: absolute;
  width: 115%;
  height: 109%;
  background-color: $main-color;
  right: -1.5%;
  top: 80%;
  border-radius: 100% 50%;

  @include bp(mobile) {
    width: 230%;
    top: 60%;
    border-radius: 120% 120%;
  }

  @include bp(tablet) {
    top: 60%;
    border-radius: 80% 60%;
  }
}
</style>

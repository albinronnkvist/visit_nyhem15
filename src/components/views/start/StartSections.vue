<template>
  <template 
    v-for="(section, index) in sectionContents" 
    :key="index"
  >
    <section 
      class="hero is-fullheight" 
      :class="{'has-background-light': index % 2 === 0, 'has-background-white': index % 2 !== 0 }"
    >
      <div class="hero-body">
        <div class="container">
          <div 
            class="columns is-vcentered"
            :class="{'reverse-columns': index % 2 !== 0 }"
          >
            <div
              v-if="index % 2 === 0"
              data-aos="fade-left"
              class="column is-12-mobile is-6-tablet is-6-desktop is-6-widescreen"
            >
              <figure class="image is-square">
                <img 
                  :src="section.imgSrc" 
                  loading="lazy"
                  :alt="section.title"
                >
              </figure>
            </div>
            <div
              data-aos="fade-down"
              class="column is-12-mobile is-offset-0-mobile is-6-tablet is-offset-0-tablet is-6-desktop is-offset-0-desktop is-6-widescreen is-offset-1-widescreen"
            >
              <h1 class="titled title is-1">
                {{ section.title }}
              </h1>
              <h2 class="subtitled subtitle">
                {{ section.text }}
              </h2>
              <div class="buttons">
                <button 
                  class="button is-primary hvr-icon-forward" 
                  @click="routerPush(section.route)"
                >
                  {{ $t("nav.readMore") }}&nbsp;<i class="las la-angle-right hvr-icon" />
                </button>
              </div>
            </div>
            <div
              v-if="index % 2 !== 0"
              data-aos="fade-left"
              class="column is-12-mobile is-6-tablet is-6-desktop"
            >
              <figure class="image is-square">
                <img 
                  :src="section.imgSrc" 
                  loading="lazy"
                  :alt="section.title"
                >
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from 'vue-i18n'
import RouterNavigator from '@/components/mixins/RouterNavigator'

export default defineComponent({
  name: "StartSections",

  setup() {
    const { t } = useI18n({ useScope: 'global' })
    let { routerPush } = RouterNavigator()

    const sectionContents = computed(() => [
      {
        imgSrc: require("@/assets/start/house-front.svg"),
        title: t("startpage.about.title"),
        text: t("startpage.about.text"),
        route: "about"
      },
      {
        imgSrc: require("@/assets/start/find.svg"),
        title: t("startpage.find.title"),
        text: t("startpage.find.text"),
        route: "find"
      },
      {
        imgSrc: require("@/assets/start/explore.svg"),
        title: t("startpage.explore.title"),
        text: t("startpage.explore.text"),
        route: "explore"
      }
    ])

    return {
      routerPush,
      sectionContents
    }
  }
})
</script>

<style lang="scss" scoped>
/***************
  Sections 
****************/
@media (max-width: $breakpoint-tablet) {
  .reverse-columns {
    flex-direction: column-reverse; // place image on top
    display: flex;
  }
}
</style>

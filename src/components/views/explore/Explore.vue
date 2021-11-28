<template>
  <div>
    <!-- Landing section -->
    <SubpageLanding
      :breadcrumbs="breadcrumbs"
      :background-image="backgroundImage"
      :title="title"
      :text="text"
    />

    <div id="scrollDown" />
    <Categories />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from "vue";
import { useI18n } from 'vue-i18n'
import SubpageLanding from "@/components/sections/SubpageLanding.vue"

const Categories = defineAsyncComponent(() => 
  import('./Categories.vue' /* webpackChunkName: "Categories" */)
)

export default defineComponent({
  name: 'Explore',
  components: {
    SubpageLanding,
    Categories
  },

  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const backgroundImage = ref<string>('start/explore.svg')

    const breadcrumbs = computed(() => [
      {
        id: 1,
        route: "explore",
        title: t("nav.explore.main"),
        isLast: true,
      }
    ])

    const title = computed<string>(() => t("nav.explore.main"))
    const text = computed<string>(() => t("explorepage.intro"))

    return {
      backgroundImage,
      breadcrumbs,
      title,
      text
    }
  }
})
</script>

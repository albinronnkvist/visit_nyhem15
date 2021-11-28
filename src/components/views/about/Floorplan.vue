<template>
  <div>
    <h3 class="title">
      {{ $t("aboutpage.description.floorplan") }}
    </h3>
    <figure class="is-16by9">
      <video
        src="@/assets/about/rooms/floorplan-compressed.mp4"
        controls
        playsinline
        muted
        poster="@/assets/about/rooms/floorplan-sv.svg"
      />
    </figure>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: "Floorplan",

  setup() {
    const { t } = useI18n({ useScope: 'global' })
  } 
})
</script>

<style lang="scss">
video {
  height: 100%;
}
</style>
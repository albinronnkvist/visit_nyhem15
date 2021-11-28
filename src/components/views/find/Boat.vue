<template>
  <div class="columns">
    <div class="column mb-2">
      <h3 class="title">
        <i 
          class="las la-ship" 
          aria-label="Ship" 
        />
        &nbsp;
        {{ $t("findpage.travelplanner.boat.main") }}
      </h3>
      <h4 class="subtitled">
        1. {{ $t("findpage.travelplanner.boat.mooring.main") }}
      </h4>
      <p>
        {{ $t("findpage.travelplanner.boat.mooring.text") }} 
      </p>
      <h4 class="subtitled mt-4">
        2. Nyhem 15
      </h4>
      <p>
        {{ $t("findpage.travelplanner.boat.nyhem15") }}
      </p>
    </div>
    <div class="column">
      <MapBoat />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapBoat from './MapBoat.vue'

export default defineComponent({
  name: 'Boat',
  components: {
    MapBoat
  }
})
</script>

<style lang="scss" scoped>
.subtitled {
  font-weight: 900;
}
</style>

<template>
  <div 
    ref="map"
    class="mapper"
  />
</template>

<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent, onMounted, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMapsApiKey } from '@/apiKeys.js'

declare var google: any;

export default defineComponent({
  name: 'Map',
  setup() {
    const homePos = ref({
      lat: 60.3349288474885,
      lng: 18.513518213979463
    })

    const loader = new Loader({ apiKey: GoogleMapsApiKey })
    const map = ref(null)
    onMounted(async () => {
      await loader.load()
      const mapper = new google.maps.Map(map.value, {
        center: homePos.value,
        zoom: 11,
        mapId: '431f5e6ccf10325a',
        disableDefaultUI: true
      })

      new google.maps.Marker({
        position: homePos.value,
        map: mapper,
        title: "Nyhem 15 | Huset",
        animation: google.maps.Animation.DROP
      });
    })

    return {
      map
    }
  }
})
</script>

<style lang="scss" scoped>
.mapper {
  height: 100%;
}
</style>
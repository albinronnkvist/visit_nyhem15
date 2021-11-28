<template>
  <div 
    ref="map" 
    class="mapper" 
  />
</template>

<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent, onMounted, ref } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapsApiKey } from '@/apiKeys.js'

declare var google: any;

export default defineComponent({
  name: "MapCommute",
  setup() {
    const homePos = ref({
      lat: 60.3349288474885,
      lng: 18.513518213979463,
    });
    const grasoPos = ref({
      lat: 60.346233,
      lng: 18.461757,
    });
    const oregrundPos = ref({
      lat: 60.340701,
      lng: 18.446473,
    });
    const loader = new Loader({ apiKey: GoogleMapsApiKey });
    const map = ref(null);

    onMounted(async () => {
      await loader.load();
      const mapper = new google.maps.Map(map.value, {
        center: { lat: 60.341188, lng: 18.475751 },
        zoom: 13,
        mapId: "431f5e6ccf10325a",
      });

      const homeMarkerIcon = {
      path:
        "M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z",
      fillColor: "#673ab7",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(15, 30),
    };

    const homePathCoordinates = [
      grasoPos.value,
      { lat: 60.346853, lng: 18.462304 },
      { lat: 60.347361, lng: 18.463809 },
      { lat: 60.347803, lng: 18.464460 },
      { lat: 60.347554, lng: 18.465029 },
      { lat: 60.346551, lng: 18.465759 },
      { lat: 60.345690, lng: 18.468849 },
      { lat: 60.345314, lng: 18.472025 },
      { lat: 60.344034, lng: 18.477572 },
      { lat: 60.342792, lng: 18.481595 },
      { lat: 60.341720, lng: 18.488011 },
      { lat: 60.342638, lng: 18.494320 },
      { lat: 60.341390, lng: 18.499352 },
      { lat: 60.340594, lng: 18.504577 },
      { lat: 60.339087, lng: 18.50759 },
      { lat: 60.338111, lng: 18.50941 },
      { lat: 60.336985, lng: 18.51247 },
      { lat: 60.335652, lng: 18.514208 },
      { lat: 60.335509, lng: 18.513612 },
      { lat: 60.335206, lng: 18.513328 },
      { lat: 60.33501, lng: 18.513349 },
    ];

    const ferryPathCoordinates = [
      oregrundPos.value,
      grasoPos.value,
    ];

    const pathArrow = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    const dashedLine = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 2,
    };

      new google.maps.Marker({
        position: homePos.value,
        map: mapper,
        title: "Nyhem 15 | Huset",
        animation: google.maps.Animation.DROP,
        icon: homeMarkerIcon,
      });

      new google.maps.Marker({
        position: grasoPos.value,
        map: mapper,
        title: "Gräsö färjeläge",
        animation: google.maps.Animation.DROP,
      });

      new google.maps.Marker({
        position: oregrundPos.value,
        map: mapper,
        title: "Öregrund färjeläge",
        animation: google.maps.Animation.DROP,
      });

      const homePath = new google.maps.Polyline({
        path: homePathCoordinates,
        geodesic: true,
        strokeColor: "#673ab7",
        strokeOpacity: 0,
        strokeWeight: 2,
        icons: [
          {
            icon: dashedLine,
            offset: "0",
            repeat: "20px",
          }
        ]
      });

      const ferryPath = new google.maps.Polyline({
        path: ferryPathCoordinates,
        geodesic: true,
        strokeColor: "#ea4335",
        strokeOpacity: 0,
        strokeWeight: 2,
        icons: [
          {
            icon: dashedLine,
            offset: "0",
            repeat: "20px",
          }
        ]
      });
      ferryPath.setMap(mapper);
      homePath.setMap(mapper);
    });

    return {
      map,
    };
  },
});
</script>

<style lang="scss" scoped>
.mapper {
  height: 65vh;
  border-radius: 0.25rem;
}
</style>
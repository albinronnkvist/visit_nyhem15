<template>
  <div 
    ref="map" 
    class="mapper"
  />
</template>

<script lang="ts">
/* eslint-disable no-undef */
import { defineComponent, onMounted, ref, computed } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMapsApiKey } from '@/apiKeys.js'

declare var google: any;

export default defineComponent({
  name: "MapBoat",
  setup() {
    const homePos = ref({
      lat: 60.334846,
      lng: 18.513383,
    });
    const boatParkingPos = ref({ 
      lat: 60.334740, 
      lng: 18.505390 
    });
    const loader = new Loader({ apiKey: GoogleMapsApiKey });
    const map = ref(null);

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

    const boatMarkerIcon = {
      path:
        "M 15 3 L 15 5 L 11 5 L 11 8 L 7 8 L 7 13.90625 L 6.15625 14.09375 L 6.15625 14.125 C 4.351563 14.515625 3.457031 16.605469 4.40625 18.1875 L 6 20.875 L 6 25.84375 C 5.191406 25.617188 4.625 25.21875 4.625 25.21875 L 3.375 26.78125 C 3.375 26.78125 4.917969 28 7.03125 28 C 8.492188 28 9.421875 27.515625 10 27.15625 C 10.582031 27.511719 11.558594 28 13.03125 28 C 14.492188 28 15.421875 27.515625 16 27.15625 C 16.582031 27.511719 17.558594 28 19.03125 28 C 20.492188 28 21.421875 27.515625 22 27.15625 C 22.582031 27.511719 23.558594 28 25.03125 28 C 27.144531 28 28.625 26.78125 28.625 26.78125 L 27.375 25.21875 C 27.375 25.21875 26.832031 25.652344 26 25.875 L 26 20.875 L 27.59375 18.1875 C 28.542969 16.605469 27.648438 14.515625 25.84375 14.125 L 25 13.9375 L 25 8 L 21 8 L 21 5 L 17 5 L 17 3 Z M 13 7 L 19 7 L 19 10 L 23 10 L 23 13.5 L 16.21875 12.03125 L 16 12 L 15.78125 12.03125 L 9 13.5 L 9 10 L 13 10 Z M 16 14.0625 L 25.40625 16.0625 C 25.929688 16.175781 26.183594 16.699219 25.90625 17.15625 L 24.15625 20.09375 L 24 20.3125 L 24 25.84375 C 23.191406 25.617188 22.625 25.21875 22.625 25.21875 L 22 24.71875 L 21.375 25.21875 C 21.375 25.21875 20.371094 26 19.03125 26 C 17.691406 26 16.625 25.21875 16.625 25.21875 L 16 24.71875 L 15.375 25.21875 C 15.375 25.21875 14.371094 26 13.03125 26 C 11.691406 26 10.625 25.21875 10.625 25.21875 L 10 24.71875 L 9.375 25.21875 C 9.375 25.21875 8.832031 25.652344 8 25.875 L 8 20.3125 L 7.84375 20.09375 L 6.09375 17.15625 C 5.816406 16.695313 6.070313 16.175781 6.59375 16.0625 Z M 11 16 C 10.398438 16 10 16.699219 10 17.5 C 10 18.300781 10.398438 19 11 19 C 11.601563 19 12 18.300781 12 17.5 C 12 16.699219 11.601563 16 11 16 Z M 21 16 C 20.398438 16 20 16.699219 20 17.5 C 20 18.300781 20.398438 19 21 19 C 21.601563 19 22 18.300781 22 17.5 C 22 16.699219 21.601563 16 21 16 Z",
      fillColor: "#ea4335",
      fillOpacity: 1,
      strokeWeight: 0,
      rotation: 0,
      scale: 1,
      anchor: new google.maps.Point(15, 30),
    };
    
    const homePathCoordinates = [
      { lat: 60.334673, lng: 18.505390 },
      { lat: 60.334406, lng: 18.507108 },
      { lat: 60.334555, lng: 18.507644 },
      { lat: 60.334300, lng: 18.510112 },
      { lat: 60.334789, lng: 18.510852 },
      { lat: 60.334851, lng: 18.512775 },
      { lat: 60.334846, lng: 18.513383 },
    ];

    const boatPathCoordinates = [
      { lat: 60.343601, lng: 18.465643 },
      { lat: 60.339558, lng: 18.488813 },
      { lat: 60.335960, lng: 18.500234 },
      { lat: 60.335104, lng: 18.504814 },
      { lat: 60.334852, lng: 18.505417 },
      { lat: 60.334740, lng: 18.505390 }
    ];

    const pathArrow = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    const dashedLine = {
      path: "M 0,-1 0,1",
      strokeOpacity: 1,
      scale: 2,
    };

    onMounted(async () => {
      await loader.load();
      const mapper = new google.maps.Map(map.value, {
        center: { lat: 60.338518, lng: 18.491619 },
        zoom: 13,
        mapId: "431f5e6ccf10325a",
      });

      new google.maps.Marker({
        position: homePos.value,
        map: mapper,
        title: "Nyhem 15 | Huset",
        animation: google.maps.Animation.DROP,
        icon: homeMarkerIcon,
      });

      new google.maps.Marker({
        position: boatParkingPos.value,
        map: mapper,
        title: "Båtplats",
        animation: google.maps.Animation.DROP,
        icon: boatMarkerIcon,
      });

      const boatPath = new google.maps.Polyline({
        path: boatPathCoordinates,
        geodesic: true,
        strokeColor: "#ea4335",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        icons: [
          {
            icon: pathArrow,
            offset: "0%",
          },
          {
            icon: pathArrow,
            offset: "50%",
          }
        ]
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
      homePath.setMap(mapper);
      boatPath.setMap(mapper);
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

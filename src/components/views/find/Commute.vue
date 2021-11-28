<template>
  <div class="columns">
    <div class="column mb-2 is-half">
      <h3 class="title">
        <i 
          class="las la-bus" 
          aria-label="Bus" 
        /> 
        &nbsp;
        {{ $t("findpage.travelplanner.public.main") }}
      </h3>
      <h4 class="subtitled">
        1. Öregrund färjeläge
      </h4>
      <p>
        {{ $t("findpage.travelplanner.car.oregrund1") }}
        <a 
          href="https://goo.gl/maps/9uVY842ygBtWDtwr9" 
          target="_blank"
        >
          Öregrund färjeläge
        </a>. 
        {{ $t("findpage.travelplanner.car.oregrund2") }}
      </p>
      <form
        @submit.prevent="getTrip"
      >
        <label class="label mt-2">{{ $t("findpage.travelplanner.public.from") }}</label>
        <div class="control has-icons-left has-icons-right">
          <input 
            v-model="searchStation"
            class="input is-primary" 
            type="text"
            :placeholder="searchStationTitle"
            required
            @focus="showStations"
          >
          <span class="icon is-medium is-left">
            <i class="las la-search" />
          </span>
        </div>
        <div 
          v-if="isStations && (searchStation.length > 0)" 
          class="box"
        >
          <aside class="menu">
            <progress
              v-show="loadingStations"
              class="progress is-medium is-primary mb-4"
            >
              100%
            </progress>
            <ul class="menu-list">
              <template 
                v-for="startItems in stations" 
                :key="startItems.id"
              >
                <template 
                  v-for="startItem in startItems" 
                  :key="startItem.name"
                >
                  <li class="has-text-weight-bold">
                    <a @click="selectedStation(startItem.id, startItem.name)">
                      {{ startItem.name }}
                    </a>
                  </li>
                </template>
              </template>
            </ul>
          </aside>
        </div>
        <div 
          v-if="tripError !== ''"
          class="notification is-danger is-light"
        >
          {{ tripError }}
        </div>
        <label class="label mt-4">{{ $t("findpage.travelplanner.public.to") }}</label>
        <div class="control has-icons-left has-icons-right">
          <input 
            class="input is-primary" 
            type="text"
            placeholder="Öregrund färjeläge"
            disabled
          >
          <span class="icon is-medium is-left">
            <i 
              class="las la-map-marker-alt" 
              aria-label="Map marker" 
            />
          </span>
        </div>
        <div class="control">
          <div class="field is-grouped mt-4">
            <p class="control">
              <label class="label">{{ $t("findpage.travelplanner.public.date") }}</label>
              <input 
                v-model="startDate"
                type="date"
                required 
              >
            </p>
            <p class="control">
              <label class="label">{{ $t("findpage.travelplanner.public.time") }}</label>
              <input 
                v-model="startTime"
                type="time" 
                required
              >
            </p>
          </div>
        </div>
        <input
          type="submit"
          :value="searchTitle"
          class="button is-primary mt-6 mb-2"
        >
      </form>
      <a 
        id="commute-result"
        ref="commute-result"
        class="anchor" 
      />
      <div v-show="loading">
        <progress
          class="progress is-medium is-primary mb-4"
        >
          100%
        </progress>
      </div>
      <CommuteResult 
        :trip-list="tripList"
        :loading="loading"
        :start-date="startDate"
        :start-time="startTime" 
      />
      <h4 class="subtitled mt-6">
        2. Gräsö färjeläge
      </h4>
      <p>
        {{ $t("findpage.travelplanner.car.graso") }}
        <a 
          href="https://goo.gl/maps/4sJjvpdMGHVYXWqS7" 
          target="_blank"
          rel="noreferrer"
        >
          Gräsö färjeläge
        </a>.
        (<a
          href="https://www.trafikverket.se/farjerederiet/farjeleder/Farjeleder-i-Uppsala212/Grasoleden/Tidtabell-Grasoleden/"
          target="_blank"
          rel="noreferrer"
        >
          {{ $t("findpage.travelplanner.car.timetable") }}
        </a>)
      </p>

      <h4 class="subtitled mt-4">
        3. Nyhem 15
      </h4>
      <p class="mb-4">
        {{ $t("findpage.travelplanner.public.nyhem15") }}
        <a 
          href="https://goo.gl/maps/tLNY2GooJs4kMCBa7" 
          target="_blank"
          rel="noreferrer"
        >
          Nyhem 15.
        </a>
        {{ $t("findpage.travelplanner.public.nyhem152") }}
      </p>
    </div>
    <div class="column mb-6">
      <MapCommute />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue"
import { useI18n } from 'vue-i18n'
import CommuteResult from './CommuteResult.vue'
import MapCommute from './MapCommute.vue'
import { TrafiklabApiKey } from '@/apiKeys.js'

export default defineComponent({
  name: "Commute",
  components: {
    MapCommute,
    CommuteResult
  },

  setup() {
    let searchStation = ref<string>('')
    let isStations = ref<boolean>(false)
    let stations = ref<any>([])
    let selectedStationId = ref<string>('')
    let startDate = ref(new Date().toISOString().substr(0, 10))
    let startTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }))
    let tripList = ref<any>(null)
    let tripError = ref<string>('')
    let loading = ref<boolean>(false)
    let loadingStations = ref<boolean>(false)
    const { t } = useI18n({ useScope: 'global' })

    watch(searchStation, () => {
      if(searchStation.value.length >= 1) {
        getStations(searchStation.value);
        tripError.value = '';
      } else {
        stations.value = null;
        tripError.value = '';
      }
    })

    let getStations = async (query: string) => {
      loadingStations.value = true
      
      let stationsResponse = await fetch(
        `https://api.resrobot.se/v2/location.name?key=${TrafiklabApiKey}&input=${query}?&format=json`
      )
      stations.value = await stationsResponse.json()
      loadingStations.value = false;
    }

    let showStations = () => {
      isStations.value = true;
    }

    let hideStations = () => {
      isStations.value = false;
    }

    let selectedStation = (id: string, name: string) => {
      selectedStationId.value = id;
      searchStation.value = name;
      hideStations();
    }

    let getTrip = async () => {
      loading.value = true;
      if(selectedStationId.value && (selectedStationId.value !== '740000470')) {
        scrollToAnchor('#commute-result');

        let tripResponse = await fetch(
          `https://api.resrobot.se/v2/trip?key=${TrafiklabApiKey}&originId=${selectedStationId.value}&destId=740000470&date=${startDate.value}&time=${startTime.value}&format=json`
        );
        let response = await tripResponse.json();
        tripList.value = response;
        tripError.value = '';
        loading.value = false;
      } 
      else if(selectedStationId.value === '740000470') {
        tripError.value = 'Du har angett samma startpunkt som slutpunkt. Vänligen ange en annan startpunkt.';
        tripList.value = null;
        loading.value = false;
      }
      else if(!selectedStationId.value) {
        tripError.value = 'Du måste ange en startpunkt';
        tripList.value = null;
        loading.value = false;
      }
      else {
        tripError.value = 'Oj! Något gick fel med din sökning, försök igen';
        tripList.value = null;
        loading.value = false
      }
    }
    
    let scrollToAnchor = (refName: string) => {
      location.hash = refName;
    }

    const searchTitle = computed(() => t("findpage.travelplanner.public.search"))
    const searchStationTitle = computed(() => t("findpage.travelplanner.public.searchStation"))

    return { 
      isStations,
      searchStation,
      getStations,
      stations,
      showStations,
      hideStations,
      selectedStation,
      selectedStationId,
      startDate,
      startTime,
      getTrip,
      tripList,
      tripError,
      loading,
      scrollToAnchor,
      loadingStations,
      searchTitle,
      searchStationTitle
    }
  }
})
</script>

<style lang="scss" scoped>
input,
textarea {
  border: 1px solid $main-color;
}

input[type="date"],
input[type="time"] {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid #004D40;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  display: inline-block !important;
  visibility: visible !important;
}

a.anchor {
    display: block;
    position: relative;
    top: -100px;
    visibility: hidden;
}

form {
  border-radius: 4px;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 1em;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}

.subtitled {
  font-weight: 900;
}
</style>

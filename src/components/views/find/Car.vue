<template>
  <div>
    <div class="columns">
      <div class="column mb-2">
        <h3 class="title">
          <i 
            class="las la-car" 
            aria-label="Car" 
          /> 
          &nbsp;
          {{ $t("findpage.travelplanner.car.main") }}
        </h3>
        <h4 class="subtitled">
          1. Öregrund färjeläge
        </h4>
        <p>
          {{ $t("findpage.travelplanner.car.oregrund1") }}
          <a 
            href="https://goo.gl/maps/9uVY842ygBtWDtwr9" 
            target="_blank"
            rel="noreferrer"
          >
            Öregrund färjeläge
          </a>
        </p>
        <h4 class="subtitled mt-4">
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
          {{ $t("findpage.travelplanner.car.nyhem15") }}
          <a 
            href="https://goo.gl/maps/tLNY2GooJs4kMCBa7" 
            target="_blank"
            rel="noreferrer"
          >
            Nyhem 15
          </a>
          {{ $t("findpage.travelplanner.car.nyhem152") }}
        </p>
      </div>
      <div class="column mb-6">
        <MapCar />
      </div>
    </div>
    <!-- <div class="columns">
      <div class="column">
        <a 
          id="time-table"
          ref="time-table"
          class="anchor" 
        />
        <h3 class="title">
          Tidtabell <i class="las la-ship" />
        </h3>
        <div 
          class="card" 
          style="max-width: 400px;"
        >
          <header class="card-header">
            <p class="card-header-title">
              Sök avgång
            </p>
            <button 
              class="card-header-icon show-search" 
              aria-label="more options"
              @click="showSearch"
            >
              <span class="icon">
                <i 
                  :class="[isSearch ? 'las la-angle-up' : 'las la-angle-down']" 
                  aria-hidden="true" 
                />
              </span>
            </button>
          </header>
          <div 
            v-show="isSearch"
            class="card-content"
          >
            <div class="content">
              <div class="field is-grouped">
                <p class="control">
                  <input 
                    v-model="startDate"
                    type="date" 
                  >
                </p>
                <p class="control">
                  <input 
                    v-model="startTime"
                    type="time" 
                  >
                </p>
              </div>
              <a 
                class="button is-primary"
                style="max-width: 120px;"
                @click="getTrip"
              >
                Sök avgång  
              </a>
            </div>
          </div>
        </div>
        <div class="box mt-4">
          <progress
            v-show="loading"
            class="progress is-medium is-primary mb-4"
          >
            100%
          </progress>
          <table 
            v-if="tripList !== null && !loading" 
            class="table is-fullwidth"
          >
            <div class="tags">
              <span class="tag is-medium">{{ tripStartDate }} | {{ startTime }}</span>
            </div>
            <tr>
              <th>Avgång<br><span class="is-size-7 has-text-weight-light">{{ tripOriginName }}</span></th>
              <th>Ankomst<br><span class="is-size-7 has-text-weight-light">{{ tripDestinationName }}</span></th>
            </tr>
            <template
              v-for="Trip in tripList.Trip"
              :key="Trip.idx"
            > 
              <tr>
                <template
                  v-for="Leg in Trip.LegList"
                  :key="Leg"
                >
                  <td>{{ Leg[0].Origin.time.replace(removeSeconds, '') }}</td>            
                  <td>{{ Leg[Leg.length - 1].Destination.time.replace(removeSeconds, '') }}</td>
                </template>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import MapCar from './MapCar.vue'
import moment from 'moment'

export default defineComponent({
  name: 'Car',
  components: {
    MapCar
  },
  setup() {
    const apiKey = ref("3744ef17-fb35-48f1-97e9-855aad52672f")
    let tripList = ref<any>(null)
    let startDate = ref(new Date().toISOString().substr(0, 10))
    let startTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }))
    let isSearch = ref(false)
    let loading = ref<boolean>(false)
    const { t, locale } = useI18n({ useScope: 'global' })

    onMounted(() => {
      getTrip();
    })

    const getTrip = async () => {
      loading.value = true
      let tripResponse = await fetch(
        `https://api.resrobot.se/v2/trip?key=${apiKey.value}&originId=740000470&destId=740001122&date=${startDate.value}&time=${startTime.value}&format=json`
      )
    
      let response = await tripResponse.json();
      tripList.value = response;
      loading.value = false
    }

    let tripOriginName = computed(() => {
      return tripList.value.Trip[0].LegList.Leg[0].Origin.name
    }) 

    let tripDestinationName = computed(() => {
      return tripList.value.Trip[0].LegList.Leg[0].Destination.name
    }) 

    let tripStartDate = computed(() => {
      moment.locale(locale.value);
      return moment(startDate.value).format('dddd Do')
    })

    const removeSeconds = new RegExp(/(:\d{2}| [AP]M)$/)

    let showSearch = () => {
      if(isSearch.value === false) {
        isSearch.value = true
      } else {
        isSearch.value = false
      }
    }

    let scrollToAnchor = (refName: string) => {
      location.hash = refName;
    }

    return {
      tripList,
      removeSeconds,
      startDate,
      startTime,
      isSearch,
      showSearch,
      tripOriginName,
      tripDestinationName,
      getTrip,
      tripStartDate,
      loading,
      scrollToAnchor
    }
  }
})
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
  min-height: 500px;
  height: 100%;
}

.car {
  width: 80%;
  display: block;

  @include bp(mobile-and-tablet) {
    display: none;
  }
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

.show-search {
  border: none;
  background-color: transparent;
}

a.anchor {
  display: block;
  position: relative;
  top: -100px;
  visibility: hidden;
}

.subtitled {
  font-weight: 900;
}
</style>

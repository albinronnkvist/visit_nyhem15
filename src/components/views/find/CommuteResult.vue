<template>
  <div v-if="tripList !== null && tripList !== undefined && (tripList.Trip.length > 0) && !showLoading">
    <p class="has-text-weight-bold mt-4">
      {{ tripOriginName }} 
      &nbsp;
      <i 
        class="las la-arrow-right" 
        aria-label="Arrow right" 
      /> 
      &nbsp;
      Öregrund färjeläge / Smedjegatan
    </p>
    <p class="mb-4">
      {{ $t("findpage.travelplanner.public.departure") }}: 
      &nbsp;
      <i 
        class="las la-calendar" 
        aria-label="Calendar" 
      />
      {{ tripStartDate }}
      &nbsp;
      <i 
        class="las la-clock"
        aria-label="Clock"  
      />
      {{ tripStartTime }}
    </p>
    <!-- Trip -->
    <template
      v-for="Trip in tripListResult.Trip"
      :key="Trip.idx"
    > 
      <!-- LegList -->
      <div class="card mb-2">
        <template
          v-for="Leg in Trip.LegList"
          :key="Leg"
        >
          <header class="card-header">
            <p 
              class="card-header-title" 
              style="display: block"
            >
              <span>{{ Leg[0].Origin.time.replace(removeSeconds, '') }} - {{ Leg[Leg.length - 1].Destination.time.replace(removeSeconds, '') }}</span>
              <br>
              <span class="has-text-weight-normal is-size-7">
                <i 
                  class="las la-exchange-alt" 
                  aria-label="Exchange" 
                />
                &nbsp;
                {{ Leg.length - 1 }}
              </span>
            </p>
            <button 
              class="card-header-icon show-trip-details" 
              aria-label="more options" 
              @click="showTripDetails(Trip.idx)"
            >
              <span class="icon hvr-icon-hang">
                <i 
                  v-if="tripDetails !== Trip.idx"
                  class="las la-angle-down hvr-icon" 
                  aria-label="Angle down" 
                />
                <i 
                  v-if="tripDetails === Trip.idx"
                  class="las la-angle-up hvr-icon" 
                  aria-label="Angle up" 
                />
              </span>
            </button>
          </header>
          <!-- Legs -->
          <template
            v-for="l in Leg"
            :key="l.idx"
          >
            <div
              v-show="tripDetails === Trip.idx" 
              class="card-content"
            >
              <div class="content leg">
                <div class="leg-content">
                  <span class="has-text-weight-bold mb-2">
                    {{ l.Origin.time.replace(removeSeconds, '') }} - {{ l.Origin.name }}
                  </span>
                  <div 
                    v-if="l.Product" 
                    class="product"
                  >
                    <div class="icon-text">
                      <span v-if="l.Product.catCode === '1'">
                        <i 
                          class="las la-train"
                          aria-label="Train" 
                        />
                      </span>
                      <span v-if="l.Product.catCode === '2'">
                        <i 
                          class="las la-train"
                          aria-label="Train" 
                        />
                      </span>
                      <span v-if="l.Product.catCode === '3'">
                        <i 
                          class="las la-train"
                          aria-label="Train" 
                        />
                      </span>
                      <span v-if="l.Product.catCode === '4'">
                        <i 
                          class="las la-train"
                          aria-label="Train" 
                        />
                      </span>
                      <span v-if="l.Product.catCode === '5'">
                        <i 
                          class="las la-subway" 
                          aria-label="Subway" 
                        />
                      </span>
                      <span v-if="l.Product.catCode === '6'">
                        <i 
                          class="las la-tram" 
                          aria-label="Tram" 
                        />
                      </span>
                      <span v-if="l.Product.catCode === '7'">
                        <i 
                          class="las la-bus" 
                          aria-label="Bus" 
                        />
                      </span>
                      <span v-if="l.Product.catCode === '8'">
                        <i 
                          class="las la-ship" 
                          aria-label="Ship" 
                        />
                      </span>
                      <span v-if="l.Product.catCode === '9'">
                        <i 
                          class="las la-taxi" 
                          aria-label="Taxi" 
                        />
                      </span>
                      <span class="chip">
                        {{ l.Product.name }}
                      </span>
                      <span class="chip2">
                        <img 
                          :src="`https://resrobotimages.samtrafiken.se/images/${l.Product.operatorCode}.jpg`"
                          alt="Operator"
                        >
                      </span>
                    </div>
                  </div>
                  <div 
                    v-else 
                    class="product"
                  >
                    <span class="icon-text">
                      <i 
                        class="las la-walking" 
                        aria-label="Walking" 
                      />
                      {{ $t("findpage.travelplanner.public.walk") }} 
                    </span> 
                  </div>

                  <br>
                  <div v-if="l.Stops">
                    {{ l.Stops.Stop.length }} {{ $t("findpage.travelplanner.public.stations") }} 
                    <br>
                    <span class="has-text-weight-bold mb-2">
                      {{ l.Destination.time.replace(removeSeconds, '') }} - {{ l.Destination.name }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import moment from 'moment'

export default defineComponent({
  name: 'CommuteResult',
  props: {
    tripList: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      deafult: false
    },
    startDate: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    },
    startTime: {
      type: String,
      default: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" })
    }
  },
  setup(props) {
    const { t, locale } = useI18n({ useScope: 'global' })
    
    let tripDetails = ref<number>(-1)
    let tripListResult = computed(() => {
      return props.tripList
    })
    let tripOriginName = computed(() => {
      return props.tripList.Trip[0].LegList.Leg[0].Origin.name
    }) 
    let showLoading = computed(() => {
      return props.loading
    })

    let tripStartDate = computed(() => {
      moment.locale(locale.value);
      return moment(props.startDate).format('dddd Do')
    })

    let tripStartTime = computed(() => {
      return props.startTime
    })

    const removeSeconds = new RegExp(/(:\d{2}| [AP]M)$/)

    let showTripDetails = (id: any) => {
      if (tripDetails.value === id) {
        tripDetails.value = -1;
      } else {
        tripDetails.value = id;
      }
    }

    return {
      tripDetails,
      showTripDetails,
      tripListResult,
      tripOriginName,
      removeSeconds,
      showLoading,
      tripStartDate,
      tripStartTime
    }
  }
})
</script>

<style lang="scss" scoped>
.leg {
  border-left: solid 1px; 
  border-color: $main-color;
}

.leg-content {
  padding-left: 10px;
}

.show-trip-details {
  border: none;
  background-color: transparent;
}

.product {
  margin-top: 4px;
  i {
    font-size: 2em;
    color: lighten($main-color, 20);
    display: inline-block;
  }

  .chip {
    background-color: lighten($main-color, 20);
    color: #fff;
    padding: 1px 8px;
    border-radius: 8px;
    margin-left: 10px;
    font-size: 0.9em;
  }

  .chip2 {
    background-color: #fff;
    color: #fff;
    padding: 1px 8px;
    border-radius: 8px;
    margin-left: 10px;
    font-size: 0.9em;
  }
}
</style>

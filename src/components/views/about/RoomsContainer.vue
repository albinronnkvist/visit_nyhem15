<template>
  <div class="has-background-white">
    <div class="container is-fluid">
      <h2 class="titled mt-6 has-text-centered">
        {{ $t("aboutpage.description.rooms") }}
      </h2>
      <div
        data-aos="fade-right"
        class="card main-card mb-6"
      >
        <div class="tabs is-left">
          <ul>
            <li 
              :class="{'is-active': currentTab === 'rooms'}"
              tabindex="0"
              @click="changeTab('rooms')"
            >
              <a>
                <span class="icon is-medium">
                  <i 
                    class="las la-gavel" 
                    aria-label="Gavel" 
                  />
                </span>
                <span>{{ $t("aboutpage.description.rooms") }}</span>
              </a>
            </li>
            <li 
              :class="{'is-active': currentTab === 'floorplan'}"
              tabindex="0"
              @click="changeTab('floorplan')"
            >
              <a>
                <span class="icon is-medium">
                  <i 
                    class="las la-home"
                    aria-label="House"  
                  />
                </span>
                <span>{{ $t("aboutpage.description.floorplan") }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div 
          v-if="currentTab === 'rooms'"
          class="card-content"
        >
          <Rooms />
        </div>
        <div 
          v-if="currentTab === 'floorplan'"
          class="card-content"
        >
          <Floorplan />
        </div>
      </div>        
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Loading from '@/components/other/Loading.vue'
const Floorplan = defineAsyncComponent({
  loader: () => 
  import('./Floorplan.vue' /* webpackChunkName: "Floorplan" */),
  loadingComponent: Loading
})
const Rooms = defineAsyncComponent({
  loader: () => 
  import('./Rooms.vue' /* webpackChunkName: "Rooms" */),
  loadingComponent: Loading
})

export default defineComponent({
  name: "RoomsContainer",
  components: {
    Floorplan,
    Rooms
  },

  setup() {
    type Tabs = 'floorplan' | 'rooms';
    const { t } = useI18n({ useScope: 'global' })
    let currentTab = ref<Tabs>('rooms')

    const changeTab = (value: Tabs) => {
      currentTab.value = value;
    }

    return {
      currentTab,
      changeTab
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0.25rem;

  .image {
    border-radius: 0.25rem;
  }
}

.tabs {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  @include bp(mobile) {
    overflow-x: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    margin-left: 0;
    margin-right: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .is-active {
    color: $main-color;
    border-bottom: 1px solid $main-color;
  }

  ul {
    li {
      margin-left: 0;

      a {
        padding-left: 0;

        span {
          margin-left: 0;
        }
      }

      .icon:last-child {
        margin-left: 0;
      }
    }
  }
}

.tabs:not(:last-child) {
  margin-bottom: 0;
}
</style>
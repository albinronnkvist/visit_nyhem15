<template>
  <div class="has-background-white">
    <div class="container is-fluid">
      <h2 class="titled mt-6 has-text-centered">
        {{ $t("nav.about.description") }}
      </h2>
      <div
        data-aos="fade-right"
        class="card main-card mb-6"
      >
        <div class="tabs is-left">
          <ul>
            <li 
              :class="{'is-active': currentTab === 'facilities'}"
              tabindex="0"
              @click="changeTab('facilities')"
            >
              <a>
                <span class="icon is-medium">
                  <i 
                    class="las la-info-circle"
                    aria-label="Info circle"  
                  />
                </span>
                <span>{{ $t("aboutpage.description.facilities.main") }}</span>
              </a>
            </li>
            <li 
              :class="{'is-active': currentTab === 'rules'}"
              tabindex="0"
              @click="changeTab('rules')"
            >
              <a>
                <span class="icon is-medium">
                  <i 
                    class="las la-gavel"
                    aria-label="Gavel"  
                  />
                </span>
                <span>{{ $t("aboutpage.description.rules.main") }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div 
          v-if="currentTab === 'facilities'"
          class="card-content"
        >
          <Facilities />
        </div>
        <div 
          v-if="currentTab === 'rules'"
          class="card-content"
        >
          <Rules />
        </div>
      </div>        
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Loading from '@/components/other/Loading.vue'
const Rules = defineAsyncComponent({
  loader: () => 
  import('./Rules.vue' /* webpackChunkName: "Rules" */),
  loadingComponent: Loading
})
const Facilities = defineAsyncComponent({
  loader: () => 
  import('./Facilities.vue' /* webpackChunkName: "Facilities" */),
  loadingComponent: Loading
})

export default defineComponent({
  name: "Information",
  components: {
    Rules,
    Facilities
  },

  setup() {
    type Tabs = 'rules' | 'facilities';
    const { t } = useI18n({ useScope: 'global' })
    let currentTab = ref<Tabs>('facilities')

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
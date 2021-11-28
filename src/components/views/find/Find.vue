<template>
  <div>
    <!-- Landing section -->
    <SubpageLanding2
      :breadcrumbs="breadcrumbs"
      :background-image="backgroundImage"
      :title="title"
      :text="text"
    />

    <div id="scrollDown" />
    <div class="has-background-white">
      <div class="container is-fluid">
        <h2 class="titled mt-6 has-text-centered">
          {{ $t("nav.find.travelPlanner") }}
        </h2>
        <div
          data-aos="fade-right"
          class="card main-card mb-6"
        >
          <div class="tabs is-left">
            <ul>
              <li 
                :class="{'is-active': currentTab === 'commute'}"
                tabindex="0"
                @click="changeTab('commute')"
              >
                <a>
                  <span class="icon is-medium">
                    <i 
                      class="las la-bus" 
                      aria-label="Bus"
                    />
                  </span>
                  <span>{{ $t("findpage.travelplanner.public.main") }}</span>
                </a>
              </li>
              <li 
                :class="{'is-active': currentTab === 'car'}"
                tabindex="0"
                @click="changeTab('car')"
              >
                <a>
                  <span class="icon is-medium">
                    <i 
                      class="las la-car"
                      aria-label="Car" 
                    />
                  </span>
                  <span>{{ $t("findpage.travelplanner.car.main") }}</span>
                </a>
              </li>
              <li 
                :class="{'is-active': currentTab === 'boat'}"
                @click="changeTab('boat')"
              >
                <a>
                  <span class="icon is-medium">
                    <i 
                      class="las la-ship"
                      aria-label="Ship"
                    />
                  </span>
                  <span>{{ $t("findpage.travelplanner.boat.main") }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div 
            v-if="currentTab === 'commute'"
            class="card-content"
          >
            <Commute />
          </div>
          <div 
            v-if="currentTab === 'car'"
            class="card-content"
          >
            <Car />
          </div>
          <div 
            v-if="currentTab === 'boat'"
            class="card-content"
          >
            <Boat />
          </div>
        </div>
      </div>
    </div>
    <FAQ :faq-items="faqItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent,defineAsyncComponent, computed, ref } from "vue";
import { useI18n } from 'vue-i18n'
import { db } from '@/firebase/firebaseInit.js'
import SubpageLanding2 from "../../sections/SubpageLanding2.vue"
import Loading from '@/components/other/Loading.vue'

const Commute = defineAsyncComponent({ 
  loader: () => 
  import('./Commute.vue' /* webpackChunkName: "Commute" */),
  loadingComponent: Loading
})
const Car = defineAsyncComponent({ 
  loader: () => 
  import('./Car.vue' /* webpackChunkName: "Car" */),
  loadingComponent: Loading
})
const Boat = defineAsyncComponent({ 
  loader: () => 
  import('./Boat.vue' /* webpackChunkName: "Boat" */),
  loadingComponent: Loading
})
const FAQ = defineAsyncComponent({ 
  loader: () => 
  import('@/components/views/about/FAQ.vue' /* webpackChunkName: "FAQ" */),
  loadingComponent: Loading
})

interface FAQItem {
  id: string;
  category: string;
  question: string;
  questionEn: string;
  questionDe: string;
  answer: string;
  answerEn: string;
  answerDe: string;
}

export default defineComponent({
  name: "Find",
  components: {
    SubpageLanding2,
    Commute,
    Car,
    Boat,
    FAQ
  },

  setup() {
    type Tabs = 'commute' | 'car' | 'boat';

    const { t } = useI18n({ useScope: 'global' })
    const backgroundImage = ref<string>('start/find.svg')
    let currentTab = ref<Tabs>('commute')

    const breadcrumbs = computed(() => [
      {
        id: 1,
        route: "find",
        title: t("nav.find.main"),
        isLast: true,
      }
    ])

    let title = computed<string>(() => t("nav.find.main"))
    let text = computed<string>(() => t("findpage.intro"))

    let faqItems = ref<FAQItem[]>([])
    db.collection('faq').where("category", "==", "find").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          category: doc.data().category,
          question: doc.data().question,
          questionEn: doc.data().questionEn,
          questionDe: doc.data().questionDe,
          answer: doc.data().answer,
          answerEn: doc.data().answerEn,
          answerDe: doc.data().answerDe
        }
        faqItems.value.push(data)
      })
    })

    const changeTab = (value: Tabs) => {
      currentTab.value = value;
    }

    return {
      backgroundImage,
      breadcrumbs,
      faqItems,
      title,
      text,
      currentTab,
      changeTab
    }
  }
})
</script>

<style lang="scss" scoped>
.tabs {
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  @include bp(mobile) {
    max-width: 350px;
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

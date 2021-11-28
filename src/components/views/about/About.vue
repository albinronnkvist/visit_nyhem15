<template>
  <div>
    <SubpageLanding
      :breadcrumbs="breadcrumbs"
      :background-image="backgroundImage"
      :title="title"
      :text="text"
    />
    <div id="scrollDown" />
    <RoomsContainer />
    <Information />
    <FAQ :faq-items="faqItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent,defineAsyncComponent, ref, computed } from "vue";
import { useI18n } from 'vue-i18n'
import { db } from '@/firebase/firebaseInit.js'
import Loading from '@/components/other/Loading.vue'
import SubpageLanding from "@/components/sections/SubpageLanding.vue";

const RoomsContainer = defineAsyncComponent({
  loader: () => import('@/components/views/about/RoomsContainer.vue' /* webpackChunkName: "RoomsContainer" */),
  loadingComponent: Loading
})
const Information = defineAsyncComponent({
  loader: () =>
  import('@/components/views/about/Information.vue' /* webpackChunkName: "Information" */),
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
  name: "About",
  components: {
    SubpageLanding,
    RoomsContainer,
    Information,
    FAQ
  },

  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const backgroundImage = ref<string>('start/house-front.svg')

    const breadcrumbs = computed(() => [
      {
        id: 1,
        route: "about",
        title: t("nav.about.main"),
        isLast: true,
      }
    ])

    const title = computed<string>(() => t("nav.about.main"))
    const text = computed<string>(() => t("aboutpage.intro"))

    let faqItems = ref<FAQItem[]>([])
    db.collection('faq').where("category", "==", "about").get().then(querySnapshot => {
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

    return {
      backgroundImage,
      breadcrumbs,
      title,
      text,
      faqItems
    }
  }
});
</script>

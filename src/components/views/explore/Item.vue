<template>
  <div class="has-background-white mt-6">
    <div class="container is-fluid">
      <div class="intro-container">
        <BreadcrumbsSub :breadcrumbs="breadcrumbs" />
        <h2 
          class="titled mt-0 mb-0 has-text-centered"
        >
          <span v-if="$i18n.locale == 'sv'">{{ title }}</span>
          <span v-else-if="$i18n.locale == 'en'">{{ titleEn }}</span>
          <span v-else-if="$i18n.locale == 'de'">{{ titleDe }}</span>
          <span v-else>{{ titleEn }}</span>
        </h2>
        <p class="has-text-centered mt-4">
          <span v-if="$i18n.locale == 'sv'">{{ text }}</span>
          <span v-else-if="$i18n.locale == 'en'">{{ textEn }}</span>
          <span v-else-if="$i18n.locale == 'de'">{{ textDe }}</span>
          <span v-else>{{ textEn }}</span>
        </p>
      </div>
      <div
        data-aos="fade-right"
        class="card main-card mb-6 mt-6"
      >
        <div class="card-content">
          <h3 class="title">
            {{ subItems.length }} 
            <span v-if="($i18n.locale == 'en') && (subItems.length === 1)">tip</span>
            <span v-else-if="$i18n.locale == 'de'">tipp</span>
            <span v-else>tips</span>
          </h3>
          <div class="columns is-mobile is-multiline">
            <div 
              v-for="subItem in subItems" 
              :key="subItem.id"
              class="column is-12-mobile is-6-desktop" 
            >
              <div class="card item-card">
                <div 
                  v-if="subItem.image"
                  class="card-image"
                >
                  <figure class="image is-16by9">
                    <img 
                      :src="subItem.image" 
                      :alt="subItem.title"
                    >
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="content">
                      <p class="title is-4">
                        {{ subItem.title }}
                      </p>
                      <p class="subtitle is-6">
                        <span 
                          v-if="$i18n.locale == 'sv'" 
                          class="tag"
                        >
                          {{ title }}
                        </span>
                        <span 
                          v-else-if="$i18n.locale == 'en'" 
                          class="tag"
                        >
                          {{ titleEn }}
                        </span>
                        <span 
                          v-else-if="$i18n.locale == 'de'" 
                          class="tag"
                        >
                          {{ titleDe }}
                        </span>
                        <span 
                          v-else 
                          class="tag"
                        >
                          {{ titleEn }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <span v-if="$i18n.locale == 'sv'">{{ subItem.text }}</span>
                    <span v-else-if="$i18n.locale == 'en'">{{ subItem.textEn }}</span>
                    <span v-else-if="$i18n.locale == 'de'">{{ subItem.textDe }}</span>
                    <span v-else>{{ subItem.textEn }}</span>
                  </div>
                  <footer class="card-footer">
                    <a 
                      :href="`http://www.google.com/maps/place/${subItem.location.latitude},${subItem.location.longitude}`" 
                      target="_blank"
                      class="button is-primary mr-4"
                      rel="noreferrer"
                    >
                      {{ $t("explorepage.map") }} &nbsp;<i class="las la-map-marker" />
                    </a>
                    <a 
                      v-if="subItem.website"
                      :href="subItem.website" 
                      target="_blank"
                      class="button is-primary"
                      rel="noreferrer"
                    >
                      {{ $t("explorepage.website") }} &nbsp;<i class="las la-external-link-alt" />
                    </a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { db, f } from '@/firebase/firebaseInit.js'
import { useRoute } from 'vue-router'
import BreadcrumbsSub from "@/components/sections/BreadcrumbsSub.vue"
import { useI18n } from 'vue-i18n'

interface SubItem {
  id: string;
  title: string;
  text: string;
  textEn: string;
  textDe: string;
  image: string;
  photographer: string;
  location: {latitude: number, longitude: number};
  website: string;
}

export default defineComponent({
  name: 'ExploreItem',
  components: {
    BreadcrumbsSub
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    let id = ref('')
    let title = ref('')
    let titleEn = ref('')
    let titleDe = ref('')
    let text = ref('')
    let textEn = ref('')
    let textDe = ref('')
    let image = ref('')
    let category = ref('')
    const route = useRoute();
    let subItems = ref<SubItem[]>([])

    db.collection('exploreItems').where(f.firestore.FieldPath.documentId(), "==", route.params.itemId)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        id.value = doc.id,
        title.value = doc.data().title,
        titleEn.value = doc.data().titleEn,
        titleDe.value = doc.data().titleDe,
        text.value = doc.data().text,
        textEn.value = doc.data().textEn,
        textDe.value = doc.data().textDe,
        image.value = doc.data().image
        category.value = doc.data().category
      })
    });

    db.collection('exploreItems')
    .doc(route.params.itemId as string)
    .collection('exploreSubItems')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          textEn: doc.data().textEn,
          textDe: doc.data().textDe,
          image: doc.data().image,
          photographer: doc.data().photographer,
          location: doc.data().location,
          website: doc.data().website
        }
        subItems.value.push(data);
      })
    });

    const breadcrumbs = computed(() => [
      {
        id: 1,
        route: "explore",
        title: t("nav.explore.main"),
        isLast: false,
      },
      {
        id: 2,
        route: "explore/:itemId",
        title: title.value,
        isLast: true,
      }
    ]);

    let backgroundImageStyle = computed(() => {
      return `backgroundImage: url(${image.value})`
    })

    return {
      id,
      title,
      titleEn,
      titleDe,
      text,
      textEn,
      textDe,
      image,
      category,
      breadcrumbs,
      backgroundImageStyle,
      subItems
    }
  }
})
</script>

<style lang="scss" scoped>
/***************
  Intro
****************/
.subpage-intro-container {
  width: 100vw;
  height: 60vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: bottom;

  @include bp(mobile-and-tablet) {
    background-size: 300%;
  }
}

.subpage-intro-container:before {
    content: " ";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    background: linear-gradient(0deg,rgba(0,77,64,0) 0%, rgba(0,77,64,.4) 80%, rgba(0,77,64,.85) 100%);
}

.card-footer {
  border-top: none;
}

.item-card {

  @include bp(mobile) {
    box-shadow: none;
  }
}
</style>
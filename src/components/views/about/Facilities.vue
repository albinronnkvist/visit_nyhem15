<template>
  <div>
    <h3 class="title">
      {{ $t("aboutpage.description.facilities.main") }}
    </h3>
    <template v-if="facilityCategories.length > 0">
      <template v-if="showMore">
        <div
          v-for="facility in facilityCategories"
          :key="facility.id"
        >
          <h4 class="mb-4">
            <span v-if="$i18n.locale == 'sv'">{{ facility.title }}</span>
            <span v-else-if="$i18n.locale == 'en'">{{ facility.titleEn }}</span>
            <span v-else-if="$i18n.locale == 'de'">{{ facility.titleDe }}</span>
            <span v-else>{{ facility.titleEn }}</span>
          </h4>
          <div class="columns is-mobile is-multiline">
            <div 
              v-for="item in facility.items"
              :key="item.id"
              class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen"
            >
              <p>
                <i 
                  :class="[item.icon]" 
                  :aria-label="item.titleEn" 
                />&nbsp;
                <span v-if="$i18n.locale == 'sv'">{{ item.text }}</span>
                <span v-else-if="$i18n.locale == 'en'">{{ item.textEn }}</span>
                <span v-else-if="$i18n.locale == 'de'">{{ item.textDe }}</span>
                <span v-else>{{ item.textEn }}</span>
              </p>
            </div>
          </div>
          <hr>
        </div>
      </template>
      <template v-else>
        <div
          v-for="facility in facilityCategories.slice(0, 2)"
          :key="facility.id"
        >
          <h4 class="mb-4">
            <span v-if="$i18n.locale == 'sv'">{{ facility.title }}</span>
            <span v-else-if="$i18n.locale == 'en'">{{ facility.titleEn }}</span>
            <span v-else-if="$i18n.locale == 'de'">{{ facility.titleDe }}</span>
            <span v-else>{{ facility.titleEn }}</span>
          </h4>
          <div class="columns is-mobile is-multiline">
            <div 
              v-for="item in facility.items"
              :key="item.id"
              class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen"
            >
              <p>
                <i :class="[item.icon]" />&nbsp;
                <span v-if="$i18n.locale == 'sv'">{{ item.text }}</span>
                <span v-else-if="$i18n.locale == 'en'">{{ item.textEn }}</span>
                <span v-else-if="$i18n.locale == 'de'">{{ item.textDe }}</span>
                <span v-else>{{ item.textEn }}</span>
              </p>
            </div>
          </div>
          <hr>
        </div>
      </template>
      <div class="buttons is-centered">
        <button
          class="button is-primary is-outlined hvr-icon-hang"
          style="border-width: 1px;"
          @click="showMore = !showMore"
        >
          <span v-if="!showMore">
            {{ $t("nav.showMore") }}
          </span>
          <span v-else>
            {{ $t("nav.showLess") }}
          </span>
          <span class="icon">
            <i 
              v-if="!showMore"
              class="las la-angle-down hvr-icon" 
              aria-hidden="true"
            />
            <i 
              v-if="showMore"
              class="las la-angle-up hvr-icon" 
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </template>
    <div v-else>
      <p style="text-align: center;">
        {{ $t("aboutpage.description.facilities.loading") }}
      </p>
      <progress
        class="progress is-medium is-primary mb-4"
      >
        100%
      </progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { db } from '@/firebase/firebaseInit.js'

interface FacilityItem {
  id: string;
  category: string;
  text: string;
  textEn: string;
  textDe: string;
  icon: string;
}

interface FacilityCategory{
  id: string;
  name: string;
  title: string;
  titleEn: string;
  titleDe: string;
  items: Array<FacilityItem>;
}

export default defineComponent({
  name: "Facilities",

  setup() {
    const { t } = useI18n({ useScope: 'global' })
    let facilityCategories = ref<FacilityCategory[]>([])

    let showMore = ref(false);

    db.collection('facilityCategories').orderBy("title", "asc").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let catName = doc.data().name
        let facilityItems = ref<FacilityItem[]>([])
        db.collection('facilityItems').where("category", "==", catName).get().then(querySnapshot => {
          querySnapshot.forEach(dok => {
            const items = {
              id: dok.id,
              category: dok.data().category,
              text: dok.data().text,
              textEn: dok.data().textEn,
              textDe: dok.data().textDe,
              icon: dok.data().icon
            }
            facilityItems.value.push(items)
          })
        })

        const data = {
          id: doc.id,
          name: doc.data().name,
          title: doc.data().title,
          titleEn: doc.data().titleEn,
          titleDe: doc.data().titleDe,
          items: facilityItems.value
        }

        facilityCategories.value.push(data)
      })
    })

    return {
      facilityCategories,
      showMore
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

.no-padding {
  padding: 0 !important;
}

h4 {
  font-weight: bold;
}

ul {
  li {
    margin-bottom: 1em;
  }
}
</style>
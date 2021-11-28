<template>
  <div v-if="categories.length > 0">
    <div 
      v-for="category in categories"
      :key="category.id"
    >
      <div class="has-background-white">
        <div class="container is-fluid">
          <h2 class="titled mt-6 has-text-centered">
            <span v-if="$i18n.locale == 'sv'">{{ category.title }}</span>
            <span v-else-if="$i18n.locale == 'en'">{{ category.titleEn }}</span>
            <span v-else-if="$i18n.locale == 'de'">{{ category.titleDe }}</span>
            <span v-else>{{ category.titleEn }}</span>
          </h2>
          <SubCategories :category-name="category.name" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p style="text-align: center;">
      {{ $t("explorepage.loading") }}
    </p>
    <progress
      class="progress is-medium is-primary mb-4 progressbar"
    >
      100%
    </progress>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { useI18n } from 'vue-i18n'
import { db } from '@/firebase/firebaseInit.js'
import Loading from '@/components/other/Loading.vue'

const SubCategories = defineAsyncComponent({
  loader: () => 
  import('./SubCategories.vue' /* webpackChunkName: "SubCategories" */),
  loadingComponent: Loading
})

interface CategoryItem {
  id: string;
  name: string;
  title: string;
  titleEn: string;
  titleDe: string;
}

export default defineComponent({
  name: "Categories",
  components: {
    SubCategories
  },

  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const categories = ref<CategoryItem[]>([])

    db.collection('exploreCategories')
    .orderBy("name", "desc")
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data: CategoryItem = {
          id: doc.id,
          name: doc.data().name,
          title: doc.data().title,
          titleEn: doc.data().titleEn,
          titleDe: doc.data().titleDe
        }
        categories.value.push(data)
      })
    })

    return {
      categories
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

.tabs {
  @include bp(mobile) {
    max-width: 350px;
    overflow-x: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

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

.progressbar {
  max-width: 500px;
  margin: 0 auto;
}
</style>
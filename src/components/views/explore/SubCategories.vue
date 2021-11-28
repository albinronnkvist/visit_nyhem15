<template>
  <div 
    data-aos="fade-right" 
    class="card main-card"
  >
    <div class="tabs is-left">
      <ul>
        <template
          v-for="subCategory in subCategories"
          :key="subCategory.id"
        >
          <li
            :class="{ 'is-active': currentTab === subCategory.name }"
            tabindex="0"
            @click="changeTab(subCategory.name)"
          >
            <a>
              <span class="icon is-medium">
                <i
                  :class="subCategory.icon" 
                  :aria-label="subCategory.titleEn" 
                />
              </span>
              <span v-if="$i18n.locale == 'sv'">{{ subCategory.title }}</span>
              <span v-else-if="$i18n.locale == 'en'">{{ subCategory.titleEn }}</span>
              <span v-else-if="$i18n.locale == 'de'">{{ subCategory.titleDe }}</span>
              <span v-else>{{ subCategory.titleEn }}</span>
            </a>
          </li>
        </template>
      </ul>
    </div>
    <template
      v-for="subCategory in subCategories"
      :key="subCategory.id"
    >
      <div 
        v-if="currentTab === subCategory.name" 
        class="card-content"
      >
        <h3 class="title mb-2">
          <span v-if="$i18n.locale == 'sv'">{{ subCategory.title }}</span>
          <span v-else-if="$i18n.locale == 'en'">{{ subCategory.titleEn }}</span>
          <span v-else-if="$i18n.locale == 'de'">{{ subCategory.titleDe }}</span>
          <span v-else>{{ subCategory.titleEn }}</span>
        </h3>
        <div class="columns mb-4">
          <div class="column is-half is-full-mobile">
            <p>
              <span v-if="$i18n.locale == 'sv'">{{ subCategory.text }}</span>
              <span v-else-if="$i18n.locale == 'en'">{{ subCategory.textEn }}</span>
              <span v-else-if="$i18n.locale == 'de'">{{ subCategory.textDe }}</span>
              <span v-else>{{ subCategory.textEn }}</span>
            </p>
          </div>
        </div>
        <Items 
          :items="items" 
          :is-loading="isLoading"
          :error-message="errorMessage"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, onMounted } from "vue";
import { useI18n } from 'vue-i18n'
import { db } from '@/firebase/firebaseInit.js'
import Loading from '@/components/other/Loading.vue'

const Items = defineAsyncComponent({
  loader: () => 
  import('./Items.vue' /* webpackChunkName: "Items" */),
  loadingComponent: Loading
})

interface SubCategoryItem {
  id: string;
  name: string;
  title: string;
  titleEn: string;
  titleDe: string
  text: string;
  textEn: string;
  textDe: string;
  icon: string;
  category: string;
}

interface Item {
  id: string;
  title: string;
  titleEn: string;
  titleDe: string;
  text: string;
  textEn: string;
  textDe: string;
  image: string;
  category: string;
}

export default defineComponent({
  name: "SubCategories",
  components: {
    Items
  },
  props: {
    categoryName: {
      type: String,
      default: "EatAndDrink"
    }
  },

  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const subCategories = ref<SubCategoryItem[]>([])
    let currentTab = ref<string>('activities')
    const items = ref<Item[]>([])
    let isLoading = ref<boolean>(false)
    let errorMessage = ref<string>('')

    const getSubCategories = () => {
      db.collection('exploreSubCategories').where("category", "==", props.categoryName)
      .orderBy("name", "asc")
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data: SubCategoryItem = {
            id: doc.id,
            name: doc.data().name,
            title: doc.data().title,
            titleEn: doc.data().titleEn,
            titleDe: doc.data().titleDe,
            text: doc.data().text,
            textEn: doc.data().textEn,
            textDe: doc.data().textDe,
            icon: doc.data().icon,
            category: doc.data().category
          }
          subCategories.value.push(data)
        })
        changeTab(subCategories.value[0].name)
      })
    }

    const changeTab = (name: string) => {
      errorMessage.value = ''
      currentTab.value = name
      items.value = []
      isLoading.value = true
      db.collection('exploreItems').where("category", "==", name)
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            title: doc.data().title,
            titleEn: doc.data().titleEn,
            titleDe: doc.data().titleDe,
            text: doc.data().text,
            textEn: doc.data().textEn,
            textDe: doc.data().textDe,
            image: doc.data().image,
            category: doc.data().category
          }
          items.value.push(data)
        })
        isLoading.value = false
        if(!items.value.length) {
          errorMessage.value = t("explorepage.error.noTips")
        }
        if(items.value.length) {
          errorMessage.value = ''
        }
      })
    }

    onMounted(() => {
      getSubCategories();
    })

    return {
      subCategories,
      currentTab,
      changeTab,
      items,
      isLoading,
      errorMessage
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

.main-card {
  min-height: 400px;
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
    background: linear-gradient(to right, rgba(0,77,64,0) 0, rgba(0,77,64,0) 75%, rgba(0,77,64,.4) 100%); 

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
<template>
  <div class="has-background-primary">
    <div class="container is-fluid">
      <h2 class="titled mt-6 has-text-centered has-text-white">
        Admin
      </h2>
      <div class="columns">
        <div class="column is-3-desktop is-full-mobile">
          <!-- Menu -->
          <aside class="menu">
            <template 
              v-for="nav in navs"
              :key="nav.title"
            >
              <p class="menu-label">
                {{ nav.title }}
              </p>
              <ul class="menu-list">
                <li
                  v-for="subNav in nav.subNavs"
                  :key="subNav.name"
                >
                  <a 
                    :class="{'is-active': currentTab === subNav.name}"
                    @click="changeTab(subNav.name, subNav.title)"
                  >
                    {{ subNav.title }}
                  </a>
                </li>
              </ul>
            </template>
          </aside>
        </div>
        <div class="column is-9-desktop is-full-mobile">
          <!-- Breadcrumbs -->
          <h2 class="subtitled mt-0 has-text-left has-text-white">{{ currentTabTitle }}</h2>

          <!-- Content -->
          <AdminBooking v-if="currentTab === 'booking'" />
          <UploadImage v-if="currentTab === 'dashboard'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import AdminBooking from './adminPages/AdminBooking.vue'
import UploadImage from './adminPages/UploadImage.vue'

export default defineComponent({
  name: "Admin",
  components: {
    AdminBooking,
    UploadImage
  },

  setup() {
    const navs = computed(() => [
      { title: 'Generellt', subNavs: [
        { name: 'dashboard', title: 'Dashboard' }
      ]},
      { title: 'Om huset', subNavs: [
        { name: 'rooms', title: 'Rum' },
        { name: 'history', title: 'Historia' }
      ]},
      { title: 'Upplev', subNavs: [
        { name: 'categories', title: 'Kategorier' },
        { name: 'tips', title: 'Tips' }
      ]},
      { title: 'Övrigt', subNavs: [
        { name: 'booking', title: 'Boka' },
        { name: 'contact', title: 'Kontakt' }
      ]}
    ])

    let currentTab = ref('dashboard');
    let currentTabTitle = ref('Dashboard');
    const changeTab = (tab: string, tabTitle: string) => {
      currentTab.value = tab;
      currentTabTitle.value = tabTitle;
    }

    return {
      navs,
      currentTab,
      currentTabTitle,
      changeTab
    }
  }
});
</script>

<style lang="scss" scoped>
.menu {
  p {
    color: #fff;
  }

  ul {
    li {
      a {
        color: #fff;

        &:hover {
          background-color: #333;
        }
      }
    }
  }
}
</style>

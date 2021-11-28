<template>
  <nav 
    aria-label="breadcrumbs"
    class="breadcrumb is-centered" 
  >
    <ul>
      <li>
        <a @click="routerPush('start')">{{ $t("nav.start") }}</a>
      </li>
      <template 
        v-for="breadcrumb in breadcrumbs" 
        :key="breadcrumb.id"
      >
        <li v-if="!breadcrumb.isLast">
          <a @click="routerPush(breadcrumb.route)">{{ breadcrumb.title }}</a>
        </li>
        <li 
          v-else 
          class="is-active"
        >
          <a 
            href="#" 
            aria-current="page"
          >
            {{ breadcrumb.title }}
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface Breadcrumbs {
  id: number,
  route: string,
  title: string,
  isLast: boolean
}

export default defineComponent({
  name: "Breadcrumbs",
  props: {
    breadcrumbs: {
      type: Array as PropType<Array<Breadcrumbs>>,
      required: true
    }
  },

  methods: {
    routerPush(routeName: string) {
      this.$router.push({ name: routeName });
    },
    
    routerPushWithHash(routeName: string, routeHash: string) {
      this.$router.push({ name: routeName, hash: routeHash });
    }
  }
});
</script>

<style lang="scss" scoped>
.breadcrumb li + li::before {
  color: #fff;
}

.breadcrumb {
  z-index: 2;
  margin-bottom: 1.5rem;

  @include bp(mobile-and-tablet) {
    margin-bottom: 0.5rem;
  }

  a {
    color: darken(#72ffe7, 30);

    &:after {    
      background: none repeat scroll 0 0 transparent;
      bottom: 0;
      content: "";
      display: block;
      height: 2px;
      left: 50%;
      position: absolute;
      background: #fff;
      transition: width 0.3s ease 0s, left 0.3s ease 0s;
      width: 0;
    }

    &:hover {
      color: #fff;

      &:after { 
        width: 80%; 
        left: 0; 
      }
    }
  }
}

.breadcrumb li.is-active a {
  color: #f7f7f7;
}
</style>

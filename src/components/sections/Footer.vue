<template>
  <footer class="footer">
    <section 
      class="hero is-small"
    >
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="columns is-desktop is-centered">
            <div class="column is-one-third show-mobile">
              <img 
                src="@/assets/logo-white2.svg" 
                alt="Logo" 
                style="height: 40px;"
              >
              <div class="content mb-4">
                <p>
                  {{ $t("footer.about") }}
                  <br>
                  {{ $t("footer.book") }} 
                  <a 
                    href="https://www.stugsommar.se/hyra-stuga/uppsala/osthammar/09153/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    stugsommar.se
                  </a>
                </p>
              </div>
              <div class="social-media mb-4">
                <a 
                  href="mailto:peter@roennqvist.se" 
                  target="_blank"
                  class="button is-primary is-medium hvr-icon-pulse" 
                  aria-hidden="true"
                  rel="noreferrer"
                >
                  <i 
                    class="las la-envelope hvr-icon" 
                    aria-label="Email"
                  />
                </a>
                <a 
                  href="tel:+46708665311" 
                  target="_blank"
                  class="button is-primary is-medium hvr-icon-pulse" 
                  aria-hidden="true"
                  rel="noreferrer"
                >
                  <i 
                    class="las la-phone hvr-icon" 
                    aria-label="Phone"
                  />
                </a>
              </div>
            </div>
            <div class="column is-one-third">
              <h2 class="subtitle subtitled has-text-white mb-0">
                {{ $t("footer.menu") }} 
              </h2>
              <ul>
                <li 
                  v-for="nav in navs" 
                  :key="nav.title"
                >
                  <a 
                    @click="routerPush(nav.route)"
                  >
                    {{ nav.title }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="column is-one-third">
              <h2 class="subtitle subtitled has-text-white mb-0">
                {{ $t("footer.links") }} 
              </h2>
              <ul>
                <li 
                  v-for="link in links" 
                  :key="link.title"
                >
                  <a 
                    :href="link.link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {{ link.title }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="column is-one-third show-desktop">
              <img 
                src="@/assets/logo-white2.svg" 
                alt="" 
                style="height: 40px;"
              >
              <div class="content mb-4">
                <p>
                  {{ $t("footer.about") }}
                  <br>
                  {{ $t("footer.book") }} 
                  <a 
                    href="https://www.stugsommar.se/hyra-stuga/uppsala/osthammar/09153/"
                    target="_blank"
                  >
                    stugsommar.se
                  </a>
                </p>
              </div>
              <div class="social-media">
                <a 
                  href="mailto:peter@roennqvist.se" 
                  target="_blank"
                  class="button is-primary is-medium hvr-icon-pulse" 
                  aria-hidden="true"
                >
                  <i 
                    class="las la-envelope hvr-icon" 
                    aria-label="Email" 
                  />
                </a>
                <a 
                  href="tel:+46708665311" 
                  target="_blank"
                  class="button is-primary is-medium hvr-icon-pulse" 
                  aria-hidden="true"
                >
                  <i 
                    class="las la-phone hvr-icon" 
                    aria-label="Phone"
                  />
                </a>
              </div>
            </div>
          </div>
          <hr class="divider">
          <div class="columns">
            <div class="column">
              <button 
                v-if="isLoggedIn"
                class="button is-primary" 
                @click="logout"
              >
                Logga ut
              </button>
              <button 
                v-if="isLoggedIn"
                class="button is-primary" 
                @click="routerPush('admin')"
              >
                Admin
              </button>
              <button 
                v-if="!isLoggedIn"
                class="button is-primary" 
                @click="routerPush('login')"
              >
                {{ $t("footer.login") }} 
              </button>
            </div>
            <div class="column">
              <p class="credits">
                {{ $t("footer.by") }}  <a href="https://albinronnkvist.se">Albin Rönnkvist</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import RouterNavigator from '@/components/mixins/RouterNavigator'
import { auth } from '@/firebase/firebaseInit.js' 
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: "Footer",
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    let { routerPush, routerGo } = RouterNavigator()
    let isLoggedIn = ref(false)

    if(auth.currentUser) {
      isLoggedIn.value = true;
    }

    const logout = () => {
      auth.signOut().then(() => {
        routerGo('login')
      })
    }

    const navs = computed(() => [
      { route: "start", title: t("nav.start") },
      { route: "about", title: t("nav.about.main") },
      { route: "find", title: t("nav.find.main") },
      { route: "explore", title: t("nav.explore.main") },
      { route: "booking", title: t("nav.book") },
      { route: "contact", title: t("nav.contact") },
    ])

    const links = computed(() => [
      { link: 'https://www.stugsommar.se/hyra-stuga/uppsala/osthammar/09153/', title: 'Stugsommar' },
      { link: 'https://www.instagram.com/explore/tags/gr%C3%A4s%C3%B6/', title: 'Gräsö Instagram' },
      { link: 'https://www.facebook.com/groups/graso', title: 'Gräsö Facebook' },
      { link: 'https://sv.wikipedia.org/wiki/Gr%C3%A4s%C3%B6', title: 'Gräsö Wikipedia' },
      { link: 'https://www.roslagen.se/graso', title: 'Visit Roslagen' }
    ])

    return {
      logout,
      routerPush,
      isLoggedIn,
      navs,
      links
    }
  }
});
</script>

<style lang="scss" scoped>
footer {
  background-color: darken($main-color, 10);
  color: $white-text-color;
  padding: 0;

  @include bp(mobile) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.credits {
  @include bp(mobile) {
    padding-top: 1rem;
  }
}

.column {
  @include bp(mobile) {
    padding: 0;
  }
}

.hero.is-small .hero-body {
  padding-left: 0;
  padding-right: 0;
}

.show-desktop {
  display: block;

  @include bp(mobile-and-tablet) {
    display: none;
  }
}

.show-mobile {
  display: none;

  @include bp(mobile-and-tablet) {
    display: block;
  }
}

p {
  color: $white-text-color;
}

a {
  display: inline-block;
  position: relative;

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
      width: 100%; 
      left: 0; 
    }
  }
}

ul {
  li {
    margin-bottom: 0.5em;
  }
}

.social-media {
  display: flex;

  a {
    margin-right: .5rem;
  }
}

.credits {
  text-align: right;

  @include bp(mobile-and-tablet) {
    text-align: left;
  }
}

.divider {
  @include bp(mobile) {
    margin-left: -0.7rem;
    margin-bottom: 3rem;
  }
}
</style>

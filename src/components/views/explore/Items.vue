<template>
  <div 
    class="tile is-ancestor" 
    style="position:relative;"
  >
    <p 
      v-if="showErrorMessage != ''"
      class="has-text-info ml-3"
    >
      {{ showErrorMessage }}
    </p>
    <template v-if="!showLoading">
      <template v-if="items.length > 3">
        <button 
          v-show="buttonScrollLeft" 
          class="button is-light scrollLeft box hvr-icon-back" 
          @click="scrollLeft()"
        >
          <i 
            class="las la-angle-left hvr-icon" 
            aria-label="Angle left" 
          />
        </button>
        <button 
          v-show="buttonScrollRight" 
          class="button is-light scrollRight box hvr-icon-forward" 
          @click="scrollRight()"
        >
          <i 
            class="las la-angle-right hvr-icon" 
            aria-label="Angle right" 
          />
        </button>
      </template>
      <div 
        id="room-container"
        style="display: flex; flex-wrap: nowrap; overflow-x: auto;"
        @scroll="{endScrollLeft(); endScrollRight();}"
      >
        <div
          v-for="item in items"
          :key="item.id"
          class="column is-10-mobile is-6-tablet is-4-desktop mb-2"
          style="flex: 0 0 auto;"
          data-aos="fade-left" 
        >
          <div 
            class="card" 
            @click="routerPushWithId('explore-item', item.id)"
          >
            <div class="image-gradient">
              <div
                style="position: absolute; bottom: 0; left: 0; z-index:2; width: 100%;"
              >
                <div class="header-padding">
                  <header class="card-header">
                    <p class="title has-text-white card-header-title is-4">
                      <span v-if="$i18n.locale == 'sv'">{{ item.title }}</span>
                      <span v-else-if="$i18n.locale == 'en'">{{ item.titleEn }}</span>
                      <span v-else-if="$i18n.locale == 'de'">{{ item.titleDe }}</span>
                      <span v-else>{{ item.titleEn }}</span>
                    </p>
                    <button 
                      class="card-header-icon read-more hvr-icon-forward"
                      @click="routerPushWithId('explore-item', item.id)"
                    >
                      <span class="title icon has-text-white">
                        <i class="las la-arrow-right hvr-icon" />
                      </span>
                    </button>
                  </header>
                </div>
              </div>
              <figure 
                class="image"
                style="height: 350px; overflow: hidden;"
              >
                <img 
                  loading="lazy" 
                  :src="item.image" 
                  :alt="item.title"
                  style="z-index: 3; min-height: 100%; width: auto; object-fit: cover"
                >
              </figure>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <progress
        class="progress is-medium is-primary mb-4"
      >
        100%
      </progress>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import RouterNavigator from '@/components/mixins/RouterNavigator'

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
  name: "Items",
  props: {
    items: {
      type: Array as PropType<Array<Item>>,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false,
      required: true
    },
    errorMessage: {
      type: String,
      default: "Något blev fel"
    }
  },
  
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const { routerPushWithId } = RouterNavigator()

    let showLoading = computed(() => {
      return props.isLoading
    })
    let showErrorMessage = computed(() => {
      return props.errorMessage
    })

    watch(props.items,(currentVal) => {
      if(!props.items) {
        buttonScrollRight.value = false;
      }
      if(currentVal.length <= 3) {
        buttonScrollRight.value = false;
      }
      if(currentVal.length > 3) {
        buttonScrollRight.value = true;
      }
    })

    const buttonScrollLeft =  ref(false)
    const buttonScrollRight = ref(true)
    const scrollLeft = () => {
      let content = document.getElementById("room-container")!;
      content.scrollLeft -= (document.getElementsByClassName('column')[0] as HTMLElement).offsetWidth;
    }

    const scrollRight = () => {
        let content = document.getElementById("room-container")!;
        content.scrollLeft += (document.getElementsByClassName('column')[0] as HTMLElement).offsetWidth;
    }

    const endScrollLeft = () => {
        let content = document.getElementById("room-container")!;
        if(content.scrollLeft === 0) {
            buttonScrollLeft.value = false;
        } else {
            buttonScrollLeft.value = true;
        }
    }

    const endScrollRight = () => {
      let content = document.getElementById("room-container")!;
      if(content.scrollWidth - content.scrollLeft - content.clientWidth < 1) {
          buttonScrollRight.value = false;
      } else {
        buttonScrollRight.value = true;
      }
    }

    return {
      buttonScrollLeft,
      buttonScrollRight,
      scrollLeft,
      scrollRight,
      endScrollLeft,
      endScrollRight,
      routerPushWithId,
      showLoading,
      showErrorMessage
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0.25rem;
  cursor: pointer;

  .image {
    border-radius: 0.25rem;
  }

  &:hover {
    opacity: .75;
  }
}
.read-more {
  border: none;
  background-color: transparent;
}

video {
  height: 100%;
}

h4 {
  font-weight: bold;
}

.card-header {
  box-shadow: none;
}

#room-container {
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
#room-container::-webkit-scrollbar {
  display: none;
}

.image-gradient {
  position: relative;
}
.image-gradient:before {
  content: '';
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 0.25rem;
  background-image: linear-gradient(180deg,rgba(0,77,64,0) 0%, rgba(0,77,64,.4) 80%, rgba(0,77,64,.85) 100%);
}

.scrollLeft,
.scrollRight {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.25em;
  position: absolute;
  bottom: 45%;
  z-index: 99;
  @include bp(mobile-and-tablet) {
    display: none;
  }
}

.scrollLeft {
  left: -1.5rem;
}
.scrollRight {
  right: -1.5rem;
}

.card-header-title {
  margin-bottom: 0;
}

.header-padding {
  padding: 0;
  @include bp(desktop-xl) {
    padding: 1rem;
  }
}
</style>

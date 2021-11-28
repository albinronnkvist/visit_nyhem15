<template>
  <div>
    <h3 class="title">
      {{ $t("aboutpage.description.rooms") }}
    </h3>
    <div 
      v-if="rooms.length > 0"
      class="tile is-ancestor" 
      style="position:relative;"
    >
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
      <div 
        id="room-container"
        style="display: flex; flex-wrap: nowrap; overflow-x: auto;"
        @scroll="{endScrollButtonLeft(); endScrollButtonRight();}"
      >
        <div
          v-for="room in rooms"
          :key="room.id"
          class="column is-10-mobile is-6-tablet is-6-desktop mb-6"
          style="flex: 0 0 auto;"
          data-aos="fade-left" 
        >
          <div class="card">
            <div 
              class="card-content" 
              style="padding: 0;"
            >
              <header class="card-header">
                <h3 
                  class="title card-header-title" 
                >
                  <i 
                    :class="room.icon" 
                    :aria-label="room.titleEn" 
                  />&nbsp;
                  <span v-if="$i18n.locale == 'sv'">{{ room.title }}</span>
                  <span v-else-if="$i18n.locale == 'en'">{{ room.titleEn }}</span>
                  <span v-else-if="$i18n.locale == 'de'">{{ room.titleDe }}</span>
                  <span v-else>{{ room.titleEn }}</span>
                </h3>
                <button
                  class="card-header-icon show-room-text hvr-icon-hang"
                  aria-label="more options"
                  @click="showRoomText(room.id)"
                >
                  <span class="icon">
                    <i 
                      v-if="roomText !== room.id"
                      class="las la-angle-down hvr-icon" 
                      aria-label="Angle down"
                    />
                    <i 
                      v-if="roomText === room.id"
                      class="las la-angle-up hvr-icon" 
                      aria-label="Angle up"
                    />
                  </span>
                </button>
              </header>
              <div class="card-image">
                <div class="image-gradient">
                  <div 
                    v-show="roomText === room.id"
                    style="position: absolute; top: 0; left: 0; background-color: #fff; z-index:2; width: 100%;"
                  >
                    <div style="padding: 1.25rem;">
                      <span v-if="$i18n.locale == 'sv'">{{ room.text }}</span>
                      <span v-else-if="$i18n.locale == 'en'">{{ room.textEn }}</span>
                      <span v-else-if="$i18n.locale == 'de'">{{ room.textDe }}</span>
                      <span v-else>{{ room.textEn }}</span>
                    </div>
                  </div>
                  <figure 
                    class="image"
                    style="height: 400px; overflow: hidden;"
                  >
                    <img 
                      loading="lazy" 
                      :src="room.image" 
                      :alt="room.title"
                      style="z-index: 3; min-height: 100%; width: auto; object-fit: cover;"
                    >
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p style="text-align: center;">
        {{ $t("aboutpage.description.loading") }}
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

interface RoomItem {
  id: string;
  title: string;
  titleEn: string;
  titleDe: string;
  text: string;
  textEn: string;
  textDe: string;
  image: string;
  icon: string;
}

export default defineComponent({
  name: "Rooms",
  
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    let roomText = ref<string>('none')
    const buttonScrollLeft =  ref(false)
    const buttonScrollRight = ref(true)
    let rooms = ref<RoomItem[]>([])
    db.collection('rooms').orderBy("title", "asc").get().then(querySnapshot => {
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
          icon: doc.data().icon
        }
        rooms.value.push(data)
      })
    })
    
    let showRoomText = (id: string) => {
      if (roomText.value === id) {
        roomText.value = 'none';
      } else {
        roomText.value = id;
      }
    }
    
    let scrollLeft = () => {
      let content = document.getElementById("room-container")!;
      content.scrollLeft -= (document.getElementsByClassName('column')[0] as HTMLElement).offsetWidth;
    }

    let scrollRight = () => {
        let content = document.getElementById("room-container")!;
        content.scrollLeft += (document.getElementsByClassName('column')[0] as HTMLElement).offsetWidth;
    }

    let endScrollButtonLeft = () => {
        let content = document.getElementById("room-container")!;
        if(content.scrollLeft === 0) {
            buttonScrollLeft.value = false;
        } else {
            buttonScrollLeft.value = true;
        }
    }

    let endScrollButtonRight = () => {
      let content = document.getElementById("room-container")!;
      if(content.scrollWidth - content.scrollLeft - content.clientWidth < 1) {
          buttonScrollRight.value = false;
      } else {
          buttonScrollRight.value = true;
      }
    }

    return {
      roomText,
      rooms,
      buttonScrollLeft,
      buttonScrollRight,
      showRoomText,
      scrollLeft,
      scrollRight,
      endScrollButtonLeft,
      endScrollButtonRight
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

.show-room-text {
  border: none;
  background-color: transparent;
}

video {
  height: 100%;
}

h4 {
  font-weight: bold;
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
  border-bottom-left-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  background-image: linear-gradient(180deg,rgba(0,77,64,0) 0%, rgba(0,77,64,.4) 80%, rgba(0,77,64,.85) 100%);
}

.card {
  .image {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
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
</style>

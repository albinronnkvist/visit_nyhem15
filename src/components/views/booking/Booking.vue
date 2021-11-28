<template>
  <section 
    id="book"
    class="hero has-background-white is-medium has-text-centered is-fullheight"
  >
    <div class="hero-body">
      <div class="container">
        <div 
          class="columns is-centered mb-6" 
        >
          <div 
            data-aos="zoom-in-up" 
            class="column is-8"
          >
            <h1 class="title titled is-1 mb-6">
              {{ $t("booking.title") }}
              <span id="typewriter" />
            </h1>
            <p class="subtitle subtitled is-link">
              {{ $t("booking.text") }}
              <a
                href="https://www.stugsommar.se/hyra-stuga/uppsala/osthammar/09153/"
                target="_blank"
                rel="noreferrer"
              >
                Stugsommar.se
                <i 
                  class="las la-external-link-alt" 
                  aria-label="External link" 
                />
              </a>
            </p>
          </div>
        </div>
        <hr>
        <div v-if="nights > 0 || visitors > 0 || reviews.length > 0">
          <nav 
            class="level mt-6"
            data-aos="fade-right"
          >
            <div class="level-item has-text-centered">
              <div>
                <h3 class="heading">
                  {{ $t("booking.visitors") }}
                </h3>
                <h4 class="title">
                  {{ visitors }}
                </h4>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <h3 class="heading">
                  {{ $t("booking.nights") }}
                </h3>
                <h4 class="title">
                  {{ nights }}
                </h4>
              </div>
            </div>
            <div class="level-item has-text-centered">
              <div>
                <h3 class="heading">
                  {{ $t("booking.reviews") }}
                </h3>
                <h4 class="stars title">
                  <template 
                    v-for="(n, index) in stars" 
                    :key="index"
                  >
                    <i class="las la-star" />
                  </template>
                  <template 
                    v-for="(n, index) in (5 - stars)" 
                    :key="index"
                  >
                    <template
                      v-if="stars < 5"
                    >
                      <i                   
                        class="lar la-star" 
                        aria-label="Star" 
                      />
                    </template>
                  </template>
                </h4>
                <p class="is-size-7">
                  ({{ $t("booking.by") }} {{ reviews.length }}st)
                </p>
              </div>
            </div>
          </nav>
          <div style="position: relative;">
            <template v-if="reviews.length > 3">
              <button 
                v-show="buttonScrollLeft" 
                class="button is-light scrollLeft box hvr-icon-back" 
                @click="scrollLeft()"
              >
                <i 
                  class="las la-angle-left hvr-icon" 
                  aria-label="Angel left" 
                />
              </button>
              <button 
                v-show="buttonScrollRight" 
                class="button is-light scrollRight box hvr-icon-forward" 
                @click="scrollRight()"
              >
                <i 
                  class="las la-angle-right hvr-icon" 
                  aria-label="Right" 
                />
              </button>
            </template>
            <div 
              id="reviews-container"
              style="display: flex; flex-wrap: nowrap; overflow-x: auto;"
              data-aos="fade-left" 
              @scroll="{endScrollButtonLeft(); endScrollButtonRight();}"
            >
              <div
                v-for="review in reviews"
                :key="review.id"
                class="column is-10-mobile is-6-tablet is-4-desktop"
                style="flex: 0 0 auto;"
              >
                <div class="card">
                  <div class="card-content">
                    <p class="has-text-left has-text-weight-bold">
                      {{ review.name }}
                    </p>
                    <p 
                      class="stars has-text-left"
                    >
                      <template 
                        v-for="(n, index) in review.stars" 
                        :key="index"
                      >
                        <i 
                          class="las la-star" 
                          aria-label="Star" 
                        />
                      </template>
                      <template 
                        v-for="(n, index) in (5 - review.stars)" 
                        :key="index"
                      >
                        <template
                          v-if="review.stars < 5"
                        >
                          <i                   
                            class="lar la-star" 
                            aria-label="Star" 
                          />
                        </template>
                      </template>
                    </p>
                    <p class="mt-2 has-text-left review-text">
                      <i>
                        {{ review.text }}
                      </i>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p style="text-align: center;">
            {{ $t("booking.loading") }}
          </p>
          <progress
            class="progress is-medium is-primary mb-4"
          >
            100%
          </progress>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { db } from '@/firebase/firebaseInit.js'

interface ReviewItem {
  id: string;
  name: string;
  text: string;
  stars: number;
}

export default defineComponent({
  name: "Booking",

  setup() {
    let visitors = ref<number>(0)
    let nights = ref(0)
    db.collection('stats').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        visitors.value = doc.data().visitors,
        nights.value = doc.data().nights
      })
    })


    let reviews = ref<ReviewItem[]>([]);
    let stars = ref<number>(5)
    db.collection('reviews').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          name: doc.data().name,
          text: doc.data().text,
          stars: doc.data().stars
        }
        reviews.value.push(data)
      })
      const currentStars = reviews.value.map(star => star.stars);
      const reducer = (accumulator: any, currentValue: any) => accumulator + currentValue;
      const starsCounter =  currentStars.reduce(reducer) / currentStars.length;
      stars.value = Math.min(Math.max(Math.round(starsCounter), 1), 5)
    })



    // Scroll-buttons
    const buttonScrollLeft =  ref(false)
    const buttonScrollRight = ref(true)
    let scrollLeft = () => {
      let content = document.getElementById("reviews-container")!;
      content.scrollLeft -= (document.getElementsByClassName('column')[0] as HTMLElement).offsetWidth;
    }

    let scrollRight = () => {
        let content = document.getElementById("reviews-container")!;
        content.scrollLeft += (document.getElementsByClassName('column')[0] as HTMLElement).offsetWidth;
    }

    let endScrollButtonLeft = () => {
        let content = document.getElementById("reviews-container")!;
        if(content.scrollLeft === 0) {
            buttonScrollLeft.value = false;
        } else {
            buttonScrollLeft.value = true;
        }
    }

    let endScrollButtonRight = () => {
      let content = document.getElementById("reviews-container")!;
      if(content.scrollWidth - content.scrollLeft - content.clientWidth < 1) {
          buttonScrollRight.value = false;
      } else {
          buttonScrollRight.value = true;
      }
    }

    return {
      visitors,
      nights,
      stars, 
      reviews,
      buttonScrollLeft,
      buttonScrollRight,
      scrollLeft,
      scrollRight,
      endScrollButtonLeft,
      endScrollButtonRight
    }
  }
})
</script>

<style lang="scss" scoped>
.stars {
  color: #ffd27d
}

#reviews-container {
  scroll-behavior: smooth;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
#reviews-container::-webkit-scrollbar {
  display: none;
}

.review-text {
  min-height: 80px;
}

.scrollLeft,
.scrollRight {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1em;
  position: absolute;
  bottom: 25%;
  z-index: 99;
  @include bp(mobile-and-tablet) {
    display: none;
  }
}

.scrollLeft {
  left: -1rem;
}
.scrollRight {
  right: -1rem;
}

.container {
  @include bp(mobile) {
    max-width: 100%;
    padding-top: 4rem;
  }
}

.level-item{
  @include bp(mobile) {
    margin-bottom: 2rem;
  }
}
</style>
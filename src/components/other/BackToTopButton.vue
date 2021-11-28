<template>
  <a
    v-smooth-scroll="{ duration: 500 }"
    class="btn-to-top button is-primary hvr-icon-up"
    :class="[showButton ? 'show' : 'hide']"
    @click="toTop"
  >
    <i 
      class="las la-angle-double-up hvr-icon" 
      aria-label="Scroll to top" 
    />
  </a>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "BackToTopButton",

  setup() {
    let showButton = ref(false)

    document.addEventListener('scroll', function(e) {
      if(window.scrollY > 500) {
        showButton.value = true;
      }
      if(window.scrollY <= 500) {
        showButton.value = false;
      }
    })

    const toTop = () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return {
      showButton,
      toTop
    }
  }
});
</script>

<style lang="scss" scoped>
.btn-to-top {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.25em;
  position: fixed;
  bottom: 10px;
  right: 10px;

  i {
    margin-top: 8px;
  }

  &:hover {
    cursor: pointer;
  }
}

.show {
  display: block
}

.hide {
  display: none;
}
</style>

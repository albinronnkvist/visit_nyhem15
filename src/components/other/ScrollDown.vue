<template>
  <a 
    v-smooth-scroll="{ duration: 500 }"
    href="#scrollDown" 
    class="arrow" 
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "ScrollDown",
});
</script>

<style lang="scss" scoped>
.arrow,
.arrow:before {
  position: absolute;
  left: 50%;
  transition: .5s;
}

.arrow {
  bottom: 5vh;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  border-left: none;
  border-top: none;
  border-right: 2px $bg-color-white solid;
  border-bottom: 2px $bg-color-white solid;

  &:hover {
    bottom: 4vh;
  }

  @include bp(mobile) {
    display: none;
  }
}

.arrow:before {
  content: "";
  width: 20px;
  height: 20px;
  margin: 10px 0 0 -10px;
  border-left: none;
  border-top: none;
  border-right: 1px $bg-color-white solid;
  border-bottom: 1px $bg-color-white solid;
  -webkit-animation: arrow 2s infinite;
  animation: arrow 2s infinite;
}
</style>

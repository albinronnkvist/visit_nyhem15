<template>
  <div>{{ $t("nav.loading") }}...</div>
  <progress
    class="progress is-medium is-primary mb-4"
  >
    100%
  </progress>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Loading"
})
</script>

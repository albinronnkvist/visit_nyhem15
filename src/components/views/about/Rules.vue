<template>
  <div>
    <h3 class="title">
      {{ $t("aboutpage.description.rules.main") }}
    </h3>
    <div class="columns is-mobile is-multiline">
      <div class="column is-6-mobile is-6-tablet is-3-desktop">
        <p>
          <i 
            class="las la-clock" 
            aria-label="Clock" 
          />
          {{ $t("aboutpage.description.rules.check-in") }}:
        </p>
        <p class="has-text-weight-bold is-size-4">
          16:00
        </p>
      </div>
      <div class="column is-6-mobile is-6-tablet is-3-desktop">
        <p>
          <i 
            class="las la-clock" 
            aria-label="Clock" 
          /> 
          {{ $t("aboutpage.description.rules.check-out") }}:
        </p>
        <p class="has-text-weight-bold is-size-4">
          10:00
        </p>
      </div>
    </div>
    <hr>
    <template v-if="rules.length > 0">
      <div class="columns is-mobile is-multiline">
        <div 
          v-for="rule in rules"
          :key="rule.text"
          class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen"
        >
          <p>
            <i 
              :class="[rule.color, rule.icon]" 
              :aria-label="rule.textEn" 
            />&nbsp;
            <span v-if="$i18n.locale == 'sv'">{{ rule.text }}</span>
            <span v-else-if="$i18n.locale == 'en'">{{ rule.textEn }}</span>
            <span v-else-if="$i18n.locale == 'de'">{{ rule.textDe }}</span>
            <span v-else>{{ rule.textEn }}</span>
          </p>
        </div>
      </div>
    </template>
    <div v-else>
      <p style="text-align: center;">
        {{ $t("aboutpage.description.rules.loading") }}
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

interface RuleItem {
  id: string;
  text: string;
  textEn: string;
  textDe: string;
  icon: string;
  color: string;
}

export default defineComponent({
  name: "Rules",

  setup() {
    const { t } = useI18n({ useScope: 'global' })
    let rules = ref<RuleItem[]>([])

    db.collection('rules').orderBy("icon", "asc").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          text: doc.data().text,
          textEn: doc.data().textEn,
          textDe: doc.data().textDe,
          icon: doc.data().icon,
          color: doc.data().color
        }
        rules.value.push(data)
      })
    })

    return {
      rules
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

.main-card {
  margin-bottom: 2em;
  padding: 20px;
  @include bp(mobile) {
    padding: 0;
    margin-bottom: 4em;
  }
}

.no-padding {
  padding: 0 !important;
}

video {
  height: 100%;
}

h4 {
  font-weight: bold;
}

ul {
  li {
    margin-bottom: 1em;
  }
}
</style>
<template>
  <div 
    class="has-background-white pb-6"
  >
    <div class="container is-fluid">
      <h2 class="titled mt-6 has-text-centered">
        FAQ
      </h2>
      <div 
        v-if="faqItems.length > 0"
        class="columns is-mobile is-multiline"
      >
        <div
          v-for="question in faqItems"
          :key="question.id"
          class="column is-12-mobile is-6-tablet is-4-desktop"
          data-aos="fade-left" 
        >
          <div class="card">
            <div 
              class="card-content" 
              style="padding: 0;"
            >
              <header class="card-header">
                <h3 
                  class="card-header-title" 
                >
                  <span v-if="$i18n.locale == 'sv'">{{ question.question }}</span>
                  <span v-else-if="$i18n.locale == 'en'">{{ question.questionEn }}</span>
                  <span v-else-if="$i18n.locale == 'de'">{{ question.questionDe }}</span>
                  <span v-else>{{ question.questionEn }}</span>
                </h3>
                <button
                  class="card-header-icon show-room-text hvr-icon-hang"
                  aria-label="more options"
                  @click="showAnswer(question.id)"
                >
                  <span class="icon">
                    <i 
                      v-if="answer !== question.id"
                      class="las la-angle-down hvr-icon"
                      aria-label="Angle down"
                    />
                    <i 
                      v-if="answer === question.id"
                      class="las la-angle-up hvr-icon"
                      aria-label="Angle up"
                    />
                  </span>
                </button>
              </header>
              <div>
                <div>
                  <div 
                    v-show="answer === question.id"
                    style="background-color: #fff; z-index:2; width: 100%;"
                  >
                    <div style="padding: 1rem;">
                      <div 
                        v-if="$i18n.locale == 'sv'" 
                        class="answer"
                        v-html="question.answer" 
                      />
                      <div 
                        v-else-if="$i18n.locale == 'en'" 
                        class="answer"
                        v-html="question.answerEn" 
                      />
                      <div
                        v-else-if="$i18n.locale == 'de'" 
                        class="answer"
                        v-html="question.answerDe" 
                      />
                      <div 
                        v-else 
                        class="answer"
                        v-html="question.answerDe" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p style="text-align: center;">
          {{ $t("aboutpage.faq.loading") }}
        </p>
        <progress
          class="progress is-medium is-primary mb-4"
        >
          100%
        </progress>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useI18n } from 'vue-i18n'

interface FAQItem {
  id: string;
  category: string;
  question: string;
  questionEn: string;
  questionDe: string;
  answer: string;
  answerEn: string;
  answerDe: string;
}

export default defineComponent({
  name: "FAQ",

  props: {
    faqItems: {
      type: Array as PropType<Array<FAQItem>>,
      required: true
    }
  },
  
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    let answer = ref<string>('none')
    
    let showAnswer = (id: string) => {
      if (answer.value === id) {
        answer.value = 'none';
      } else {
        answer.value = id;
      }
    }
    
    return {
      answer,
      showAnswer
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  border-radius: 0.25rem;
}

.answer {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.show-room-text {
  border: none;
  background-color: transparent;
}

h4 {
  font-weight: bold;
}

.card-header-title {
  margin-bottom: 0;
}
</style>

<template>
  <section 
    id="contact" 
    class="hero is-fullheight"
  >
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-8 is-variable ">
          <div 
            class="column is-two-thirds has-text-left"
            data-aos="fade-left" 
          >
            <h1 class="title titled is-1 mb-6">
              {{ $t("contact.title") }}
            </h1>
            <h2 class="subtitle subtitled is-link">
              {{ $t("contact.text") }}
            </h2>
            <div class="social-media">
              <a 
                href="mailto:peter@roennqvist.se" 
                target="_blank"
                class="button is-primary is-large hvr-icon-pulse"
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
                class="button is-primary is-large hvr-icon-pulse"
                rel="noreferrer"
              >
                <i 
                  class="las la-phone hvr-icon" 
                  aria-label="Phone" 
                />
              </a>
            </div>
          </div>
          <div 
            class="column is-one-third has-text-left"
            data-aos="fade-down" 
          >
            <form 
              id="emailForm" 
              @submit.prevent="sendEmail($event)"
            >
              <div class="field">
                <label class="label">{{ $t("contact.name") }}</label>
                <div class="control">
                  <input 
                    name="from_name"
                    class="input is-medium" 
                    type="text"
                    required
                  >
                </div>
              </div>
              <div class="field">
                <label class="label mt-5">{{ $t("contact.email") }}</label>
                <div class="control">
                  <input 
                    name="reply_to"
                    class="input is-medium"
                    type="email"
                    required
                  >
                </div>
              </div>
              <div class="field">
                <label class="label mt-5">{{ $t("contact.message") }}</label>
                <div class="control">
                  <textarea 
                    name="message"
                    class="textarea is-medium"
                    required
                  />
                </div>
              </div>
              <div class="control">
                <button 
                  type="submit" 
                  class="button is-primary is-fullwidth is-large"
                  :class="{'is-loading': sendLoader}"
                  :disabled="sendProcess"
                >
                  {{ send }}&nbsp;<i :class="sendIcon" />
                </button>
                <div 
                  v-show="isSuccessMessage"
                  class="notification is-success"
                >
                  <button 
                    class="delete" 
                    @click="hideSuccessMessage()" 
                  />
                  {{ successMessage }}
                </div>
                <div 
                  v-show="isErrorMessage"
                  class="notification is-danger"
                >
                  <button 
                    class="delete" 
                    @click="hideErrorMessage()" 
                  />
                  {{ errorMessage }}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import emailjs from 'emailjs-com';
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: "Contact",

  setup() {
    const { t } = useI18n({ useScope: 'global' })
    let send = ref(t("contact.send"))
    let sendProcess = ref(false)
    let sendLoader = ref(false)
    let sendIcon = ref('las la-paper-plane')
    let successMessage = ref<string>('')
    let errorMessage = ref<string>('')
    let isSuccessMessage = ref(false)
    let isErrorMessage = ref(false)

    const sendEmail = (e: Event) => {
      send.value = t("contact.send")
      sendProcess.value = true
      sendLoader.value = true
      sendIcon.value = 'las la-spinner'

      emailjs.init('user_xik9uc2Hply9ORCechgns')
      emailjs.sendForm('service_uvykctm', 'template_qcr0v94', e.target as HTMLFormElement)
        .then(() => {
          send.value = ''
          sendLoader.value = false
          sendIcon.value = 'las la-check-circle'
          isSuccessMessage.value = true
          successMessage.value = t("contact.sendSuccess")

          setTimeout(() => {
            sendProcess.value = false;
            send.value = t("contact.send");
            sendIcon.value = 'las la-paper-plane';
            (document.getElementById("emailForm")! as HTMLFormElement).reset();
          }, 2000);
        }, 
        (error) => {
          isErrorMessage.value = true;
          errorMessage.value = `Något gick fel: ${error}`
          sendLoader.value = false
          sendIcon.value = 'las la-exclamation-triangle'

          setTimeout(() => {
            sendProcess.value = false;
            send.value = t("contact.send");
            sendIcon.value = 'las la-paper-plane';
            (document.getElementById("emailForm")! as HTMLFormElement).reset();
          }, 3000);
        });
    }

    let hideSuccessMessage = ()  => {
      isSuccessMessage.value = false;
    }
    let hideErrorMessage = ()  => {
      isErrorMessage.value = false;
    }

    return {
      send,
      sendProcess,
      sendLoader,
      sendIcon,
      sendEmail,
      isSuccessMessage,
      isErrorMessage,
      successMessage,
      errorMessage,
      hideSuccessMessage,
      hideErrorMessage
    }
  }
})
</script>

<style lang="scss" scoped>
input,
textarea {
  border: 1px solid $main-color;
}

.social-media {
  display: flex;

  a {
    margin-right: .5rem;
  }
}

.container {
  @include bp(mobile) {
    padding-top: 4rem;
  }
}
</style>
<template>
  <div class="has-background-primary">
    <div class="container is-fluid">
      <h2 class="titled mt-6 has-text-centered has-text-white">
        Logga in
      </h2>
      <div 
        v-if="!isEye && !isError && !isSuccess && !isLoading"
        class="monkey"
      >
        <LoginNormal />
      </div>
      <div 
        v-if="isEye"
        class="monkey"
      >
        <LoginPassword />
      </div>

      <div 
        v-if="isError"
        class="monkey"
      >
        <LoginError />
      </div>
      <div 
        v-if="isSuccess"
        class="monkey"
      >
        <LoginSuccess />
      </div>
      <div 
        v-if="isLoading"
        class="monkey"
      >
        <LoginLoading />
      </div>
      <div
        class="card mb-6 p-6"
        style="position: relative;"
      > 
        <div v-if="isSuccess === false">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input 
                v-model="email"
                class="input" 
                type="email" 
                placeholder="Email"
                required
                @focus="hideError"
              >
              <span class="icon is-small is-left">
                <i class="las la-envelope" />
              </span>
              <span class="icon is-small is-right">
                <i class="las fla-check" />
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input 
                v-model="password"
                class="input" 
                type="password" 
                placeholder="Lösenord"
                required
                @focus="{hideError(); showEye();}"
                @blur="hideEye"
              >
              <span class="icon is-small is-left">
                <i class="las la-lock" />
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button 
                class="button is-primary"
                :class="{'is-loading': isLoading}" 
                :disabled="isLoading"
                @click="login"
              >
                Logga in
              </button>
            </p>
          </div>
        </div>
        <div 
          v-show="isSuccess"
          class="notification is-success"
        >
          Du är inloggad!
          <br>
          Tar dig vidare till Admin-sidan
          <progress 
            class="progress is-primary" 
            max="100"
          >
            100%
          </progress>
        </div>
        <div 
          v-show="isError"
          class="notification is-danger"
        >
          <ul>
            <li 
              v-for="error in errorMessage"
              :key="error"
            >
              {{ error }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { auth } from '@/firebase/firebaseInit.js'
import RouterNavigator from '@/components/mixins/RouterNavigator'
import LoginNormal from './loginFaces/LoginNormal.vue'
import LoginPassword from './loginFaces/LoginPassword.vue'
import LoginError from './loginFaces/LoginError.vue'
import LoginSuccess from './loginFaces/LoginSuccess.vue'
import LoginLoading from './loginFaces/LoginLoading.vue'

export default defineComponent({
  name: 'Login',
  components: {
    LoginNormal,
    LoginPassword,
    LoginError,
    LoginSuccess,
    LoginLoading
  },
  setup() {
    let email = ref<string>('');
    let password = ref<string>('')
    let isLoading = ref<boolean>(false)
    let isSuccess = ref<boolean>(false)
    let isError = ref<boolean>(false)
    let errorMessage = ref<string[]>([])
    let { routerGo } = RouterNavigator()
    let isEye = ref<boolean>(false);
    
    const validEmail = (email: string) => {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    const login = () => {
      errorMessage.value = []
      if(email.value && password.value && validEmail(email.value)) {
        isLoading.value = true
        auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then(
          user => {
            isLoading.value = false;
            isSuccess.value = true;
            isError.value = false;
            setTimeout(() => {
              routerGo('admin')
            }, 2000)
          }, 
          err => {
            isLoading.value = false;
            isError.value = true;
            errorMessage.value.push(err.message)
          }
        );
      }

      if (!email.value) {
        errorMessage.value.push('Fyll i Email');
        isError.value = true;
      } else if (!validEmail(email.value)) {
        errorMessage.value.push('Felaktig Email');
        isError.value = true;
      }
      if (!password.value) {
        errorMessage.value.push('Fyll i lösenord');
        isError.value = true;
      } 
    }


    const hideError = () => {
      isError.value = false
    }

    const showEye = () => {
      isEye.value = true;
    }

    const hideEye = () => {
      isEye.value = false;
    }

    return {
      email,
      password,
      login,
      isSuccess,
      isLoading,
      isError,
      errorMessage,
      hideError,
      isEye,
      showEye,
      hideEye
    }
  }
})
</script>

<style lang="scss" scoped>
input,
textarea {
  border: 1px solid $main-color;
}

.container {
  min-height: 100vh;
  max-width: 600px !important;
}

.monkey {
  margin-bottom: -30px;

  @include bp(mobile-and-tablet) {
    margin-bottom: -30px;
  }
}
</style>

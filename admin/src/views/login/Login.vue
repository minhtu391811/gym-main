<template>
  <div class="login">
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img alt="Buusama" class="w-6" src="../../assets/images/logo.svg" />
            <span class="text-white text-lg ml-3"> MyGym </span>
          </a>
          <div class="my-auto">
            <img alt="Buusama" class="-intro-x w-1/2 -mt-16"
              src="../../assets/images/illustration.svg" />
            <div class="-intro-x text-white font-medium text-4xl leading-tight mt-10">
              A few more clicks to
              <br />
              sign in to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
            <h2 class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
              Sign In
            </h2>
            <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="intro-x mt-8">
              <input v-model.trim="validate.userEmail.$model" type="text" class="intro-x login__input form-control py-3 px-4 block"
                placeholder="Email" />
              <template v-if="validate.userEmail.$error">
                <div v-for="(error, index) in validate.userEmail.$errors" :key="index" class="text-danger mt-3">
                  {{ error.$message }}
                </div>
              </template>
              <input v-model.trim="validate.password.$model" type="password" class="intro-x login__input form-control py-3 px-4 block mt-4"
                placeholder="Password" @keydown.enter.exact.prevent="actionLogin" />
              <template v-if="validate.password.$error">
                <div v-for="(error, index) in validate.password.$errors" :key="index" class="text-danger mt-3">
                  {{ error.$message }}
                </div>
              </template>
            </div>

            <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
              <button class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top" @click="actionLogin">
                Login
              </button>
              <button class="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                @click="router.push('/register')">
                Register
              </button>
            </div>
            <div class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left">
              By signin up, you agree to our
              <a class="text-primary dark:text-slate-200" href="">Terms and Conditions</a>
              &
              <a class="text-primary dark:text-slate-200" href="">Privacy Policy</a>
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { helpers, email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Cookies from 'js-cookie'
import { LoginRequest } from '@/api/auth/interfaces/login'
import config from '@/config'

export default {
  name: 'LoginUser',
  components: {},
  setup() {
    const userEmail = ref('')
    const password = ref('')
    const message = ref('')
    const authStore = useAuthStore()
    const router = useRouter()
    const formData = {
      userEmail,
      password,
    }
    // Vuelidate
    const rules = {
      userEmail: {
        required: helpers.withMessage('Vui lòng không bỏ trống ô này', required),
        email: helpers.withMessage('Vui lòng nhập đúng Email', email),
      },
      password: {
        required: helpers.withMessage('Vui lòng không bỏ trống ô này', required),
      },
    }
    const validate = useVuelidate(rules, formData)

    async function actionLogin() {
      // validate form
      validate.value.$touch()

      if (validate.value.$invalid === false) {
        const data = {
          email: userEmail.value,
          password: password.value,
        } as LoginRequest

        if (Cookies.get(config.VITE_COOKIE_NAME)) {
          authStore.logout()
        }

        authStore.login(data)

      }
    }

    return {
      userEmail,
      password,
      message,
      actionLogin,
      router,
      validate,
    }
  },
}
</script>

<style></style>

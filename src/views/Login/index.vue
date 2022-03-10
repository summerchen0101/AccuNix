<script lang="ts">
import logo from '@/assets/logo.png'
import useLogin from '@/service/api/useLogin'
import { defineComponent, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const loginForm = reactive({
      username: 'accunix@test',
      password: '50085008',
    })
    const { doLogin, isLoading } = useLogin()
    const handleSubmit = async () => {
      const res = await doLogin({
        ...loginForm,
        app: 'accunix',
        redirectUrl: 'https://www.google.com',
      })
      if (res?.id) {
        router.push((route.query.from as string) || '/')
      }
    }
    return { handleSubmit, loginForm, isLoading, logo }
  },
})
</script>

<template>
  <div class="w-full h-full bg-gray-100 flex justify-center items-center">
    <div class="w-full max-w-xs">
      <img class="mx-auto w-52 mb-10" :src="logo" alt="" />
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
          <input class="shadow w-full form-control" type="text" v-model="loginForm.username" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
          <input class="shadow w-full form-control" type="password" v-model="loginForm.password" />
        </div>
        <div class="flex items-center justify-between">
          <button v-if="isLoading" class="bg-gray-500 text-white font-bold py-2 px-4 rounded" type="button" disabled>
            Loading
            <i class="fas fa-sync-alt animate-spin ml-2"></i>
          </button>
          <button
            v-else
            class="
              bg-primary-500
              hover:bg-primary-700
              text-white
              font-bold
              py-2
              px-4
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="button"
            @click="handleSubmit"
          >
            Sign In
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-primary-500 hover:text-primary-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">&copy;2021 AccuNix. All rights reserved.</p>
    </div>
  </div>
</template>

<style scoped></style>

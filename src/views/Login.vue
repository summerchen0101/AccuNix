<script lang="tsx">
import useLogin from '@/service/useLogin'
import { defineComponent, reactive, watch } from 'vue'
import logo from '@/assets/logo.png'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const router = useRouter()
    const loginForm = reactive({
      username: 'accunix@develop',
      password: '50085008',
    })
    const { doLogin, isLoading } = useLogin()
    const handleSubmit = async () => {
      const res = await doLogin({
        ...loginForm,
        app: 'accunix',
      })
      if (res?.auth) {
        router.push({ name: 'Home' })
      }
    }
    return () => (
      <div class="w-full h-full bg-gray-100 flex justify-center items-center">
        <div class="w-full max-w-xs">
          <img class="mx-auto w-56 mb-10" src={logo} alt="" />
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                v-model={loginForm.username}
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                v-model={loginForm.password}
              />
            </div>
            <div class="flex items-center justify-between">
              {isLoading.value ? (
                <button
                  class="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                  type="button"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmit}
                >
                  Sign In
                </button>
              )}

              <a
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            &copy;2021 AccuNix. All rights reserved.
          </p>
        </div>
      </div>
    )
  },
})
</script>

<style scoped></style>
